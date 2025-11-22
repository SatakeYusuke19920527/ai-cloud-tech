import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { drillChapters } from '@/lib/drill-data';
import { MCQRunner } from '@/components/assessment/mcq-runner';

export const dynamicParams = false;

export default async function DrillChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = drillChapters.find((c) => c.slug === slug);
  if (!chapter) {
    notFound();
  }

  return (
    <div className="space-y-6">
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

      <MCQRunner
        questions={chapter.questions}
        title={chapter.title}
        description={chapter.description}
        resultPath={`/dashboard/drill/${slug}/result`}
      />
    </div>
  );
}

export async function generateStaticParams() {
  return drillChapters.map((chapter) => ({ slug: chapter.slug }));
}
