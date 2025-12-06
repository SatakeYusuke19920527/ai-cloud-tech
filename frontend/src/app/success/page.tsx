import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  NotebookPen,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import RedirectToDashboard from './redirect-to-dashboard';

export const dynamic = 'force-static';

export default async function Success() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-linear-to-b from-background via-background to-muted/50 py-16">
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-72 bg-[radial-gradient(circle_at_center,var(--color-primary)/0.14,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-8 top-40 h-64 bg-[radial-gradient(circle_at_center,var(--color-chart-3)/0.16,transparent_55%)] blur-3xl" />

      <div className="container relative mx-auto max-w-5xl px-6">
        <div className="mb-8 flex items-center gap-3">
          <Badge className="bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
            決済が完了しました
          </Badge>
          <p className="text-sm text-muted-foreground">
            AI Cloud Tech へのご参加ありがとうございます
          </p>
        </div>

        <Card className="relative overflow-hidden border border-primary/15 bg-card/90 shadow-xl backdrop-blur">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-chart-1 to-chart-3" />
          <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3 text-primary ring-8 ring-primary/5">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  ご購入ありがとうございます
                </CardTitle>
                <CardDescription className="text-base">
                  登録が完了しました。すぐに学習を始められます。
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="rounded-2xl border border-muted-foreground/10 bg-muted/60 p-5">
                <p className="text-sm font-medium text-muted-foreground">
                  購入内容
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Sparkles className="h-4 w-4" />
                      <p className="text-sm font-semibold">次の一歩を提案</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      ゴールから逆算した学習プランを自動生成し、1週間で成果を出すフォーカスポイントを提示します。
                    </p>
                  </div>
                  <div className="rounded-xl border border-muted-foreground/10 bg-background p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-foreground">
                      <NotebookPen className="h-4 w-4" />
                      <p className="text-sm font-semibold">教材と模試を解放</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      要点まとめ、演習ドリル、弱点サマリーがすべて利用可能になりました。
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-primary/30 bg-linear-to-b from-primary/10 via-background to-background p-5 shadow-inner">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-primary">
                    次のステップ
                  </p>
                  <p className="text-sm text-muted-foreground">
                    数秒後にダッシュボードへ自動で移動します。待たずに開くこともできます。
                  </p>
                </div>

                <RedirectToDashboard delaySeconds={6} />

                <Button asChild className="w-full">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    ダッシュボードを開く
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <div className="rounded-lg border border-muted-foreground/20 bg-muted/40 p-4 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2 font-medium text-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    サポート
                  </p>
                  <p className="mt-2 leading-relaxed">
                    ご質問や請求に関するお問い合わせは{' '}
                    <a
                      className="text-primary underline-offset-4 hover:underline"
                      href="mailto:support@aicloudtech.jp"
                    >
                      support@aicloudtech.jp
                    </a>{' '}
                    までご連絡ください。
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-border/60" />

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoTile
                icon={<BarChart3 className="h-4 w-4" />}
                title="学習ダッシュボード"
                description="進捗、弱点、次にやるべきことが一目で分かります。"
              />
              <InfoTile
                icon={<ShieldCheck className="h-4 w-4" />}
                title="安心のサポート"
                description="決済や技術に関する質問はいつでもメールで承ります。"
              />
              <InfoTile
                icon={<Sparkles className="h-4 w-4" />}
                title="AI活用のヒント"
                description="新しい講座やテンプレートを毎週追加予定です。"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-muted-foreground/15 bg-muted/50 p-4 shadow-sm">
      <div className="flex items-center gap-2 text-foreground">
        {icon}
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
