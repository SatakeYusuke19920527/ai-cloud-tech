import { selectUser, updateExamDate } from '@/lib/cosmos/user';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/** 受験日を取得 */
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = (await selectUser(userId)) as { examDate?: string | null };
    return NextResponse.json(
      { examDate: user?.examDate ?? null },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch exam date', error);
    return NextResponse.json(
      { error: 'Failed to load exam date' },
      { status: 500 }
    );
  }
}

/** 受験日を保存 */
export async function PUT(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { examDate } = body as { examDate?: string | null };

    const value =
      examDate == null || examDate === ''
        ? null
        : typeof examDate === 'string'
          ? examDate.trim()
          : null;

    await updateExamDate(userId, value);

    return NextResponse.json({ ok: true, examDate: value }, { status: 200 });
  } catch (error) {
    console.error('Failed to save exam date', error);
    return NextResponse.json(
      { error: 'Failed to save exam date' },
      { status: 500 }
    );
  }
}
