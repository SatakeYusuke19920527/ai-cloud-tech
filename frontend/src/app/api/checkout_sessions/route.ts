/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { updateSubscription } from '@/lib/cosmos/user';
import { stripe } from '../../../lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin');
    const formData = await req.formData();
    const clerkId = formData.get('clerkId');

    if (!origin) {
      return NextResponse.json(
        { error: 'Origin header is missing' },
        { status: 400 }
      );
    }

    if (!clerkId || typeof clerkId !== 'string') {
      return NextResponse.json(
        { error: 'clerkId is required' },
        { status: 400 }
      );
    }

    // Create Checkout Sessions from body params.
    const session: any = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: 'price_1SWF2ZEGC7ceON3z4WEke84o',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: {
        clerkId,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    // CosmosDBのユーザー情報を更新してサブスクリプション登録日をセット
    await updateSubscription(clerkId, true);
    return NextResponse.redirect(session.url, 303);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
