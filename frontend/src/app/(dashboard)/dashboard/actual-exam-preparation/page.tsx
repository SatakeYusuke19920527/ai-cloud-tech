import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { actualExams } from '@/lib/actual-exam-data';

export default async function ActualExamPreparation() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 rounded-3xl border border-dashed border-muted-foreground/40 bg-card/60 px-8 py-16 text-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Exam Prep
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            本番対策を利用するにはログインが必要です
          </h1>
          <p className="text-sm text-muted-foreground">
            ログインまたは新規登録すると、本番対策セットにアクセスできます。
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SignInButton
            mode="modal"
            forceRedirectUrl="/dashboard/actual-exam-preparation"
            fallbackRedirectUrl="/dashboard/actual-exam-preparation"
          >
            <Button size="lg" className="px-6">
              ログイン
            </Button>
          </SignInButton>
          <SignUpButton
            mode="modal"
            forceRedirectUrl="/dashboard/actual-exam-preparation"
            fallbackRedirectUrl="/dashboard/actual-exam-preparation"
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
