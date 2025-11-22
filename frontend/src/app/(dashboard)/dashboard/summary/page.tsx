import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { summaryChapters } from '@/lib/summary-data';

export default function Summary() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">要点整理</h1>
        <p className="text-sm text-muted-foreground">
          重要単語にフォーカスしたまとめ。章を選択し、キーワードを確認しましょう。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {summaryChapters.map((chapter, index) => (
          <Link
            key={chapter.slug}
            href={`/dashboard/summary/${chapter.slug}`}
            className="group"
          >
            <Card className="h-full border border-border bg-card transition hover:-translate-y-1 hover:border-primary/50">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Chapter {index + 1}</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
                </div>
                <CardTitle className="text-lg">{chapter.title}</CardTitle>
                <CardDescription>{chapter.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
