import { saveDrillResult } from '@/lib/cosmos/drill';
import { getLatestDrillResultsByUser } from '@/lib/cosmos/drill';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { chapterSlug, score, correct, total } = body ?? {};

    if (
      !chapterSlug ||
      typeof chapterSlug !== 'string' ||
      typeof score !== 'number' ||
      typeof correct !== 'number' ||
      typeof total !== 'number'
    ) {
      return NextResponse.json(
        { error: 'chapterSlug, score, correct, total are required' },
        { status: 400 }
      );
    }

    const resource = await saveDrillResult({
      userId,
      chapterSlug,
      score,
      correct,
      total,
    });

    return NextResponse.json({ data: resource }, { status: 200 });
  } catch (error) {
    console.error('Failed to save drill result', error);
    return NextResponse.json(
      { error: 'Failed to save drill result' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results = await getLatestDrillResultsByUser(userId);

    return NextResponse.json(
      {
        userId,
        results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch drill results', error);

    return NextResponse.json(
      { error: 'Failed to fetch drill results' },
      { status: 500 }
    );
  }
}
