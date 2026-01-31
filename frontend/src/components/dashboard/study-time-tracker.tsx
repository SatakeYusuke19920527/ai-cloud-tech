'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

/**
 * 特定ページ滞在中の時間を計測し、unmount/ページ遷移時に API へ送信するトラッカー
 * - サーバー側の API (/api/user/study-time) が総学習時間をユーザードキュメントに加算
 * - ログインしていない場合は何もしない
 */
export function StudyTimeTracker() {
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;

    const start = performance.now();

    const sendStudyTime = (elapsedMs: number) => {
      const seconds = Math.round(elapsedMs / 1000);
      if (seconds <= 0) return;

      void fetch('/api/user/study-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seconds }),
        keepalive: true,
      });
    };

    const handlePageHide = () => {
      const elapsed = performance.now() - start;
      sendStudyTime(elapsed);
    };

    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);

    return () => {
      const elapsed = performance.now() - start;
      sendStudyTime(elapsed);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
    };
  }, [userId]);

  return null;
}
