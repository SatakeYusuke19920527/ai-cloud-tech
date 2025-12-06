/* eslint-disable @typescript-eslint/no-explicit-any */
import { CosmosClient } from '@azure/cosmos';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { updateSubscription } from '@/lib/cosmos/user';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const getUserContainer = () => {
  const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING!);
  const database = client.database(process.env.COSMOS_DATABASE_NAME!);
  return database.container(process.env.COSMOS_CONTAINER_NAME_USER!);
};

async function findClerkIdBySubscriptionId(subscriptionId: string) {
  const container = getUserContainer();
  const query = {
    query: 'SELECT c.id FROM c WHERE c.subscriptionId = @subId',
    parameters: [{ name: '@subId', value: subscriptionId }],
  };
  const { resources } = await container.items
    .query<{ id: string }>(query)
    .fetchAll();
  return resources[0]?.id ?? null;
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return new NextResponse('Missing Stripe signature', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error('❌ Error verifying Stripe webhook:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== 'subscription') break;

        const clerkId = session.metadata?.clerkId;
        const subscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id ?? null;

        if (!clerkId || !subscriptionId) {
          console.warn('Missing clerkId or subscriptionId in session');
          break;
        }

        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        const currentPeriodEnd = (sub as any).current_period_end
          ? new Date((sub as any).current_period_end * 1000).toISOString()
          : null;

        await updateSubscription(
          clerkId,
          true,
          subscriptionId,
          currentPeriodEnd
        );
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const subscriptionId = sub.id;
        const clerkId = await findClerkIdBySubscriptionId(subscriptionId);
        if (!clerkId) break;

        const isActive = sub.status === 'active' || sub.status === 'trialing';
        const currentPeriodEnd = (sub as any).current_period_end
          ? new Date((sub as any).current_period_end * 1000).toISOString()
          : null;

        await updateSubscription(
          clerkId,
          isActive,
          subscriptionId,
          currentPeriodEnd
        );
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse('OK', { status: 200 });
  } catch (err) {
    console.error('❌ Error handling Stripe webhook:', err);
    return new NextResponse('Webhook handler failed', { status: 500 });
  }
}
