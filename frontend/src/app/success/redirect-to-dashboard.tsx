'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Timer } from 'lucide-react';

import { Progress } from '@/components/ui/progress';

type RedirectToDashboardProps = {
  delaySeconds?: number;
};

export default function RedirectToDashboard({
  delaySeconds = 6,
}: RedirectToDashboardProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = delaySeconds * 1000;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const nextValue = Math.min(100, (elapsed / total) * 100);
      setProgress(nextValue);
    };

    const interval = setInterval(tick, 80);
    const timer = setTimeout(() => router.replace('/dashboard'), total);

    tick();

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router, delaySeconds]);

  const secondsLeft = useMemo(
    () => Math.max(0, Math.ceil((delaySeconds * (100 - progress)) / 100)),
    [delaySeconds, progress]
  );

  return (
    <div className="rounded-xl border border-primary/20 bg-background/80 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2 font-medium text-foreground">
          <Timer className="h-3.5 w-3.5 text-primary" />
          ダッシュボードへ自動で移動します
        </span>
        <span className="tabular-nums">{secondsLeft} 秒</span>
      </div>
      <Progress value={progress} className="mt-3 h-2" />
    </div>
  );
}
