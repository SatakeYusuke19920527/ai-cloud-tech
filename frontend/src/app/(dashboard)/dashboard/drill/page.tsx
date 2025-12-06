import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { drillChapters } from '@/lib/drill-data';
import { getLatestDrillResultsByUser } from '@/lib/cosmos/drill';

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function Drill() {
  const user = await currentUser();
  const latest = user ? await getLatestDrillResultsByUser(user.id) : {};

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
          <SignInButton mode="modal" forceRedirectUrl="/dashboard/drill" fallbackRedirectUrl="/dashboard/drill">
            <Button size="lg" className="px-6">
              ログイン
            </Button>
          </SignInButton>
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard/drill" fallbackRedirectUrl="/dashboard/drill">
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
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">ドリル一覧</h1>
        <p className="text-sm text-muted-foreground">
          各章20問の練習問題。テスト済みの章には正答率と最終受験日を表示します。
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {drillChapters.map((chapter, index) => (
          <Link
            key={chapter.slug}
            href={`/dashboard/drill/${chapter.slug}`}
            className="group"
          >
            <Card className="h-full border border-border bg-card transition hover:-translate-y-1 hover:border-primary/50">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Chapter {index + 1}</Badge>
                  <ArrowRight className="h-4 w-4 -muted-foreground transition group-hover:text-primary" />
                </div>
                <CardTitle className="text-lg">{chapter.title}</CardTitle>
                <CardDescription>{chapter.description}</CardDescription>
                {typeof chapter.score === 'number' && (
                  <p className="text-sm font-semibold text-foreground">
                    正答率 {chapter.score}%
                  </p>
                )}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
