import {
  addUserStudyTimeSeconds,
  getUserStudyTimeSeconds,
} from '@/lib/cosmos/user';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// 総学習時間を取得
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const totalSeconds = await getUserStudyTimeSeconds(userId);
    return NextResponse.json(
      {
        totalSeconds,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch study time', error);
    return NextResponse.json(
      { error: 'Failed to fetch study time' },
      { status: 500 }
    );
  }
}

// セッションの学習時間（秒）を加算
export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { seconds } = body as { seconds?: number };

    if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds <= 0) {
      return NextResponse.json(
        { error: 'seconds must be a positive number' },
        { status: 400 }
      );
    }

    await addUserStudyTimeSeconds(userId, Math.round(seconds));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to add study time', error);
    return NextResponse.json(
      { error: 'Failed to add study time' },
      { status: 500 }
    );
  }
}