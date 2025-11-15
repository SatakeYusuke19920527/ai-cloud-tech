import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllChapters } from '@/lib/chapter-data';

export default async function GetStartedPage() {
  const chapterMeta = await getAllChapters();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">学習ガイド</h1>
        <p className="text-sm text-muted-foreground">
          章を選択すると詳細なテキストが表示されます。G検定のシラバスに沿って学習を進めましょう。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {chapterMeta.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/dashboard/get-started/${chapter.slug}`}
            className="group"
          >
            <Card className="h-full border border-border bg-card transition hover:-translate-y-1 hover:border-primary/50">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">第{chapter.order}章</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
                </div>
                <CardTitle className="text-lg">{chapter.title}</CardTitle>
                <CardDescription>{chapter.summary}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
