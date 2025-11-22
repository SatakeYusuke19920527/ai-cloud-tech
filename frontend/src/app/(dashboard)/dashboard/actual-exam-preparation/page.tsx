import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { actualExams } from '@/lib/actual-exam-data';

export default function ActualExamPreparation() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">本番対策</h1>
        <p className="text-sm text-muted-foreground">
          模試形式の本番対策セット。カードを選択して問題を開始できます。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {actualExams.map((exam, index) => (
          <Link
            key={exam.slug}
            href={`/dashboard/actual-exam-preparation/${exam.slug}`}
            className="group"
          >
            <Card className="h-full border border-border bg-card transition hover:-translate-y-1 hover:border-primary/50">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">セット {index + 1}</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
                </div>
                <CardTitle className="text-lg">{exam.title}</CardTitle>
                <CardDescription>{exam.description}</CardDescription>
                {typeof exam.score === 'number' && (
                  <p className="text-sm font-semibold text-foreground">得点率 {exam.score}%</p>
                )}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
