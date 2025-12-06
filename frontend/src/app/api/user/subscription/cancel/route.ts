import { cancelSubscription } from '@/lib/cosmos/user';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = (await cancelSubscription(userId)) as {
      isSubscribed?: boolean;
      subscriptionExpiresAt?: string | null;
    };

    return NextResponse.json({
      isSubscribed: Boolean(user?.isSubscribed),
      subscriptionExpiresAt: user?.subscriptionExpiresAt ?? null,
    });
  } catch (error) {
    console.error('Failed to cancel subscription', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
