import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

import DrillRunner from './runner-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { drillChapters } from '@/lib/drill-data';
import { StudyTimeTracker } from '@/components/dashboard/study-time-tracker';

export const dynamicParams = false;

export default async function DrillChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await currentUser();
  const chapter = drillChapters.find((c) => c.slug === slug);
  if (!chapter) {
    notFound();
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 rounded-3xl border border-dashed border-muted-foreground/40 bg-card/60 px-8 py-16 text-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Drill
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            ドリルを利用するにはログインが必要です
          </h1>
          <p className="text-sm text-muted-foreground">
            ログインまたは新規登録すると、ドリル問題にアクセスできます。
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SignInButton
            mode="modal"
            forceRedirectUrl={`/dashboard/drill/${slug}`}
            fallbackRedirectUrl={`/dashboard/drill/${slug}`}
          >
            <Button size="lg" className="px-6">
              ログイン
            </Button>
          </SignInButton>
          <SignUpButton
            mode="modal"
            forceRedirectUrl={`/dashboard/drill/${slug}`}
            fallbackRedirectUrl={`/dashboard/drill/${slug}`}
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
    <div className="space-y-6">
      {/* ドリルページ滞在時間を学習時間として計測 */}
      <StudyTimeTracker />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/drill"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            ドリル一覧に戻る
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {chapter.title}
          </h1>
          <p className="text-sm text-muted-foreground">{chapter.description}</p>
        </div>
        {typeof chapter.score === 'number' && (
          <Badge variant="secondary" className="gap-1 text-base">
            <BookOpen className="h-4 w-4" />
            正答率 {chapter.score}%
          </Badge>
        )}
      </div>

      <DrillRunner chapter={chapter} slug={slug} />
    </div>
  );
}

export async function generateStaticParams() {
  return drillChapters.map((chapter) => ({ slug: chapter.slug }));
}
