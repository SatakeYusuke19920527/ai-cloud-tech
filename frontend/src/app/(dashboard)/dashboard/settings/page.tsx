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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  const [canceling, setCanceling] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
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

  const expiryDate = useMemo(() => {
    if (!subscription?.subscriptionExpiresAt) return null;
    const date = new Date(subscription.subscriptionExpiresAt);
    return isNaN(date.getTime()) ? null : date;
  }, [subscription?.subscriptionExpiresAt]);

  const expiryLabel = useMemo(() => {
    if (!expiryDate) return null;
    return expiryDate.toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }, [expiryDate]);

  const isExpired = Boolean(expiryDate && expiryDate.getTime() <= Date.now());
  const hasActiveAccess =
    Boolean(subscription?.isSubscribed && !isExpired) ||
    Boolean(expiryDate && !isExpired);
  const isBillingActive = Boolean(subscription?.isSubscribed && !isExpired);

  const purchaseDisabled = loadingSubscription || hasActiveAccess;
  const cancelDisabled = loadingSubscription || !isBillingActive;

  const subscriptionStatus = subscription?.isSubscribed
    ? isExpired
      ? '未加入'
      : 'AI Cloud Tech Pro（有効）'
    : hasActiveAccess
      ? 'AI Cloud Tech Pro（期限まで利用可）'
      : '未加入';

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
        <div className="space-y-1 text-xs text-muted-foreground">
          {loadingSubscription && '最新情報を取得しています...'}
          {!loadingSubscription &&
            (subscription?.isSubscribed ? (
              <>
                <p>
                  有効期限：
                  {expiryLabel ?? '情報取得中'}
                </p>
                <p>期限までは Pro プランを利用できます。</p>
              </>
            ) : hasActiveAccess ? (
              <>
                <p>
                  有効期限：
                  {expiryLabel ?? '情報取得中'}
                </p>
                <p className="text-destructive">
                  自動更新は停止しています。期限までは Pro プランを利用できますが、その後はアクセスできなくなります。サブスクリプションを再度購入されたい場合は有効期限後に再度購入してください。
                </p>
              </>
            ) : (
              <p>月額¥1,000で全コンテンツにアクセスできます。</p>
            ))}
        </div>
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
              {!subscription?.isSubscribed && hasActiveAccess && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {expiryLabel ?? '有効期限'} までは現在の Pro プランを利用できます。期限が切れると購入可能になります。
                </p>
              )}
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
              解約すると次回の契約更新がされず、契約終了後はAI Cloud Tech
              Proへのアクセスが停止します。
            </div>
            <Button
              variant="destructive"
              className="w-full"
              size="lg"
              disabled={cancelDisabled}
              onClick={() => setConfirmOpen(true)}
            >
              解約手続きを進める
            </Button>
          </CardContent>
        </Card>

        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>サブスクリプションを解約しますか？</DialogTitle>
              <DialogDescription>
                解約しても支払い済みの期限までは Pro プランを利用できます。期限（
                {expiryLabel ?? '未設定'}）を過ぎると自動でアクセスが停止します。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setConfirmOpen(false)}
                disabled={canceling}
              >
                キャンセル
              </Button>
              <Button
                variant="destructive"
                className="min-w-[140px]"
                disabled={canceling}
                onClick={async () => {
                  try {
                    setCanceling(true);
                    setLoadingSubscription(true);
                    setError(null);
                    const res = await fetch('/api/user/subscription/cancel', {
                      method: 'POST',
                    });
                    if (!res.ok) {
                      throw new Error('Failed to cancel subscription');
                    }
                    const data = (await res.json()) as SubscriptionInfo;
                    setSubscription(data);
                    setConfirmOpen(false);
                  } catch (err) {
                    console.error(err);
                    setError(
                      '解約処理に失敗しました。時間をおいて再試行してください。'
                    );
                  } finally {
                    setCanceling(false);
                    setLoadingSubscription(false);
                  }
                }}
              >
                解約を確定する
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
