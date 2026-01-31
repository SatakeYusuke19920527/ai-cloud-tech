import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { summaryChapters } from '@/lib/summary-data';
import { MemorizeTable } from './memorize-table';
import { StudyTimeTracker } from '@/components/dashboard/study-time-tracker';

export const dynamicParams = false;

export default async function SummaryChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await currentUser();
  const chapter = summaryChapters.find((c) => c.slug === slug);
  if (!chapter) {
    notFound();
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 rounded-3xl border border-dashed border-muted-foreground/40 bg-card/60 px-8 py-16 text-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Summary
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            要点整理を利用するにはログインが必要です
          </h1>
          <p className="text-sm text-muted-foreground">
            ログインまたは新規登録すると、要点整理や暗記リストを利用できます。
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SignInButton
            mode="modal"
            forceRedirectUrl={`/dashboard/summary/${slug}`}
            fallbackRedirectUrl={`/dashboard/summary/${slug}`}
          >
            <Button size="lg" className="px-6">
              ログイン
            </Button>
          </SignInButton>
          <SignUpButton
            mode="modal"
            forceRedirectUrl={`/dashboard/summary/${slug}`}
            fallbackRedirectUrl={`/dashboard/summary/${slug}`}
          >
            <Button size="lg" variant="outline" className="px-6">
              新規登録
            </Button>
          </SignUpButton>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 要点整理ページ滞在時間を学習時間として計測 */}
      <StudyTimeTracker />
      <div className="space-y-2">
        <Link
          href="/dashboard/summary"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          一覧に戻る
        </Link>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground">
          {chapter.title}
        </h1>
        <p className="text-sm text-muted-foreground">{chapter.description}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Bookmark className="h-4 w-4" />
        <span>キーワードと意味を 1:1 で暗記するためのリスト</span>
      </div>

      <MemorizeTable rows={chapter.keywords} userId={user?.id ?? undefined} chapterSlug={chapter.slug} />
    </div>
  );
}

export async function generateStaticParams() {
  return summaryChapters.map((chapter) => ({ slug: chapter.slug }));
}
