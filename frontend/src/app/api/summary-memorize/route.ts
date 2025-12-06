import { NextRequest, NextResponse } from 'next/server';
import { getSummaryMemorizedMap, upsertSummaryMemorizedState } from '@/lib/cosmos/summary';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const chapterSlug = searchParams.get('chapterSlug');

  if (!userId || !chapterSlug) {
    return NextResponse.json({ error: 'userId and chapterSlug are required' }, { status: 400 });
  }

  try {
    const map = await getSummaryMemorizedMap(userId, chapterSlug);
    return NextResponse.json({ data: map }, { status: 200 });
  } catch (error) {
    console.error('GET /api/summary-memorize error', error);
    return NextResponse.json({ error: 'Failed to fetch memorized state' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, chapterSlug, term, isMemorized } = body ?? {};

  if (!userId || !chapterSlug || !term || typeof isMemorized !== 'boolean') {
    return NextResponse.json({ error: 'userId, chapterSlug, term, isMemorized are required' }, { status: 400 });
  }

  try {
    const resource = await upsertSummaryMemorizedState(userId, chapterSlug, term, isMemorized);
    return NextResponse.json({ data: resource }, { status: 200 });
  } catch (error) {
    console.error('POST /api/summary-memorize error', error);
    return NextResponse.json({ error: 'Failed to update memorized state' }, { status: 500 });
  }
}
