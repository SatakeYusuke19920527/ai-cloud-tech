import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { summaryChapters } from '@/lib/summary-data';
import { MemorizeTable } from './memorize-table';

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

  return (
    <div className="space-y-8">
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
