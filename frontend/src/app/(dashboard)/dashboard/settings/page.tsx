'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';
import { useEffect, useMemo, useState } from 'react';

type SubscriptionInfo = {
  isSubscribed: boolean;
  subscriptionExpiresAt?: string | null;
};

export default function Settings() {
  const { userId } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(
    null
  );
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setSubscription(null);
      return;
    }

    let isMounted = true;
    const fetchSubscription = async () => {
      try {
        setLoadingSubscription(true);
        setError(null);
        const res = await fetch('/api/user/subscription');
        if (!res.ok) {
          throw new Error('Failed to fetch subscription status');
        }
        const data = (await res.json()) as SubscriptionInfo;
        if (isMounted) {
          setSubscription(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(
            '購読情報を取得できませんでした。時間をおいて再試行してください。'
          );
        }
      } finally {
        if (isMounted) {
          setLoadingSubscription(false);
        }
      }
    };

    fetchSubscription();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const purchaseDisabled = loadingSubscription || !!subscription?.isSubscribed;
  const cancelDisabled = loadingSubscription || !subscription?.isSubscribed;

  const subscriptionStatus = subscription?.isSubscribed
    ? 'AI Cloud Tech Pro（有効）'
    : '未加入';
  const expiryLabel = useMemo(() => {
    if (!subscription?.subscriptionExpiresAt) return null;
    const date = new Date(subscription.subscriptionExpiresAt);
    return isNaN(date.getTime())
      ? null
      : date.toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
  }, [subscription?.subscriptionExpiresAt]);

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 rounded-3xl border border-dashed border-muted-foreground/40 bg-card/60 px-8 py-16 text-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Subscription
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            設定ページを利用するにはログインが必要です
          </h1>
          <p className="text-sm text-muted-foreground">
            ログインまたは新規登録すると、サブスクリプションの購入・解約を管理できます。
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SignInButton
            mode="modal"
            forceRedirectUrl="/dashboard/settings"
            fallbackRedirectUrl="/dashboard/settings"
          >
            <Button size="lg" className="px-6">
              ログイン
            </Button>
          </SignInButton>
          <SignUpButton
            mode="modal"
            forceRedirectUrl="/dashboard/settings"
            fallbackRedirectUrl="/dashboard/settings"
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          設定
        </h1>
        <p className="text-sm text-muted-foreground">
          サブスクリプションのステータスや支払いに関する操作を管理できます。
        </p>
      </div>
      <Separator />
      <div className="rounded-2xl border border-muted bg-card/70 p-5 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">
          現在のステータス
        </p>
        <p className="text-xl font-semibold text-foreground">
          {subscriptionStatus}
        </p>
        <p className="text-xs text-muted-foreground">
          {loadingSubscription && '最新情報を取得しています...'}
          {!loadingSubscription &&
            (subscription?.isSubscribed
              ? expiryLabel
                ? `有効期限：${expiryLabel}`
                : '有効期限情報は準備中です。'
              : '月額¥1,000で全コンテンツにアクセスできます。')}
        </p>
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          className={cn(
            'border border-primary/20 bg-background transition',
            purchaseDisabled && 'pointer-events-none opacity-55'
          )}
        >
          <CardHeader>
            <CardTitle>サブスクリプションを購入</CardTitle>
            <CardDescription>
              月額¥1,000で要点整理・模試・進捗分析にフルアクセス。いつでもキャンセル可能です。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight">
                ¥1,000
              </span>
              <span className="text-sm text-muted-foreground">/ 月</span>
            </div>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>400+本の要点まとめとAI講座</li>
              <li>演習ドリル、模試、弱点サマリー</li>
              <li>優先メールサポート</li>
            </ul>
            <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name="clerkId" value={userId ?? ''} />
              <Button
                type="submit"
                role="link"
                className="w-full"
                size="lg"
                disabled={purchaseDisabled}
              >
                プランを購入する
              </Button>
              {/* <section>
                <button type="submit" role="link" disabled={purchaseDisabled}>
                  Checkout
                </button>
              </section> */}
            </form>
          </CardContent>
        </Card>

        <Card
          className={cn(
            'border border-destructive/30 bg-background transition',
            cancelDisabled && 'pointer-events-none opacity-55'
          )}
        >
          <CardHeader>
            <CardTitle>サブスクリプションを解約</CardTitle>
            <CardDescription>
              次回更新日前に解約すれば、それ以降の料金は発生しません。利用中の機能は支払い済み期間までご利用いただけます。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
              解約するとAI Cloud Tech
              Proのすべての機能へのアクセスが停止します。
            </div>
            <Button
              variant="destructive"
              className="w-full"
              size="lg"
              disabled={cancelDisabled}
            >
              解約手続きを進める
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
