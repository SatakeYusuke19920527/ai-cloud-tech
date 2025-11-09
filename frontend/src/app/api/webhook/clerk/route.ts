import { createUser, deleteUser, updateUser } from '@/lib/cosmos/user';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env.local'
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  if (evt.type === 'user.created') {
    const result = await createUser(
      evt.data.id,
      evt.data.email_addresses[0].email_address
    );
    console.log('🚀 ~ POST ~ result:', result);
    return new Response('user registered', { status: 200 });
  } else if (evt.type === 'user.updated') {
    const result = await updateUser(
      evt.data.id,
      evt.data.email_addresses[0].email_address
    );
    console.log('🚀 ~ POST ~ result:', result);
    return new Response('user updated', { status: 200 });
  } else if (evt.type === 'user.deleted') {
    const result = await deleteUser(evt.data.id!);
    console.log('🚀 ~ POST ~ result:', result);
    return new Response('user registered', { status: 200 });
  } else {
    return new Response('Webhook received', { status: 200 });
  }
}
