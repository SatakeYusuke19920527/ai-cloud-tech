import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { summaryChapters } from '@/lib/summary-data';

export const dynamicParams = false;

export default async function SummaryChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = summaryChapters.find((c) => c.slug === slug);
  if (!chapter) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/summary"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            一覧に戻る
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {chapter.title}
          </h1>
          <p className="text-sm text-muted-foreground">{chapter.description}</p>
        </div>
      </div>

      <Card className="border border-border bg-card">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>重要単語リスト</CardTitle>
            <CardDescription>覚えておきたいキーワードを素早く確認</CardDescription>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Bookmark className="h-4 w-4" />
            Remember
          </Badge>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 sm:grid-cols-2">
            {chapter.keywords.map((keyword) => (
              <li
                key={keyword}
                className="rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-sm font-medium text-foreground"
              >
                {keyword}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  return summaryChapters.map((chapter) => ({ slug: chapter.slug }));
}
