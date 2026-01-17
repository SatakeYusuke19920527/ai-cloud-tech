/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import {
  ArrowDownRight,
  ArrowUpRight,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  ListChecks,
  Newspaper,
  ShieldCheck,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';

const paceSummary = [
  { label: '達成率', value: '68%', detail: '総学習計画に対して' },
  { label: '進捗状況', value: 'やや先行', detail: '+6% over plan' },
  { label: '残り日数', value: '32日', detail: '試験日まで' },
  { label: '今日の学習', value: '65 / 90m', detail: '対目標' },
  { label: '総学習時間', value: '42h', detail: '累計' },
];

const heatmap = [
  [0, 2, 3, 4, 1, 0, 5],
  [1, 0, 2, 3, 0, 1, 4],
  [0, 1, 0, 2, 3, 5, 4],
  [2, 3, 4, 0, 1, 2, 0],
  [3, 4, 5, 4, 3, 2, 1],
  [1, 0, 1, 0, 2, 3, 4],
];

const syllabus = [
  { title: '第1章：人工知能とは', value: 80 },
  { title: '第2章：AIの歴史', value: 60 },
  { title: '第3章：機械学習', value: 75 },
  { title: '第4章：深層学習', value: 50 },
  { title: '第5章：応用分野', value: 65 },
  { title: '倫理・法律', value: 40 },
];

const radarPoints = [
  [82, '第1章 人工知能とは'],
  [68, '第2章 動向'],
  [75, '第3章 手法'],
  [60, '第4章 概要'],
  [65, '第5章 要素技術'],
  [58, '第6章 応用例'],
  [72, '第7章 社会実装'],
  [45, '第8章 法律・倫理'],
];

const mockScores = [
  { title: '模試スコア', score: 72, delta: '+3.2%', up: true },
  { title: '正答率（理論）', score: 76, delta: '-1.4%', up: false },
  { title: '正答率（実装）', score: 68, delta: '+2.8%', up: true },
];

const mistakeCategories = [
  '最適化手法',
  '評価指標',
  'ニューラルネットワーク',
  '法律・倫理',
  'Transformer',
];

const backlog = ['機械学習基礎', 'CNN/RNN/Transformer', '倫理・法律'];

const timeline = [
  { date: '2/14', content: '過去問40問（正答率75%）' },
  { date: '2/13', content: '深層学習 第4章 読了' },
  { date: '2/12', content: '模試#02 68点 → 弱点タグ付け完了' },
  { date: '2/11', content: '要点整理：最適化手法 30分' },
];

const weaknesses = [
  {
    title: '弱点ランキング',
    detail: '1) 最適化手法 2) 評価指標 3) 法律・倫理',
  },
  { title: '根本原因', detail: '数式問題の読解に時間がかかる／条文の暗記不足' },
  {
    title: '今日の優先項目',
    detail: '評価指標の演習10問 + 条文クイックリファレンス',
  },
];

const badges = [
  { title: '全章読破', icon: CheckCircle2 },
  { title: '模試80点超え', icon: Trophy },
  { title: '7日連続学習', icon: Flame },
  { title: '完全理解マスター', icon: ShieldCheck },
];

type NewsItem = {
  title: string;
  detail: string;
  time?: string;
  url?: string;
};

const notes = [
  {
    title: '弱点メモ',
    detail: '評価指標：F1とAUCの違いを口頭で説明できるようにする',
  },
  { title: '気づき', detail: '正誤判定問題は定義文キーワードを抽出すると速い' },
  {
    title: '質問ログ',
    detail: 'ChatGPT: 交差検証とブートストラップの使い分けについて',
  },
];

type DrillResult = {
  score: number;
  performedAt: string;
};

type ApiResponse = {
  userId: string;
  results: Record<string, DrillResult>;
};



export default function Dashboard() {
  const { userId } = useAuth();
  const [results, setResults] = useState<Record<string, DrillResult>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('/api/drill/result', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch drill results');
        }

        const data = await res.json();
        setResults(data.results);
      } catch (e) {
        console.error(e);
        setError('ドリル結果の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/tavily', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: 'AI 人工知能 最新ニュース G検定 JDLA',
            maxResults: 5,
            includeAnswer: false,
            searchDepth: 'basic',
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch news');
        }

        const { data } = await res.json();
        
        // Tavily APIのレスポンスをNewsItem形式に変換
        if (data?.results && Array.isArray(data.results)) {
          const newsItems: NewsItem[] = data.results.map((result: any, index: number) => ({
            title: result.title || 'タイトルなし',
            detail: result.content || result.snippet || '',
            url: result.url,
            time: index === 0 ? '最新' : `${index + 1}時間前`,
          }));
          setNews(newsItems);
        } else {
          // フォールバック: モックデータ
          setNews([
            {
              title: 'JDLA、最新シラバス改訂を発表',
              detail: 'ガバナンスと社会実装セクションに重点を置いた新設項目が追加。',
              time: '3時間前',
            },
            {
              title: '最新LLMの比較レポート',
              detail: '推論コストとパフォーマンスのバランスでGPT-4.1が引き続き優位。',
              time: '昨日',
            },
            {
              title: '倫理指針アップデート',
              detail: '透明性要件に関する国際的な合意形成の動向を解説。',
              time: '2日前',
            },
          ]);
        }
      } catch (e) {
        console.error('Failed to fetch news:', e);
        // エラー時はモックデータを表示
        setNews([
          {
            title: 'JDLA、最新シラバス改訂を発表',
            detail: 'ガバナンスと社会実装セクションに重点を置いた新設項目が追加。',
            time: '3時間前',
          },
          {
            title: '最新LLMの比較レポート',
            detail: '推論コストとパフォーマンスのバランスでGPT-4.1が引き続き優位。',
            time: '昨日',
          },
          {
            title: '倫理指針アップデート',
            detail: '透明性要件に関する国際的な合意形成の動向を解説。',
            time: '2日前',
          },
        ]);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, []);

  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Spinner className="h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const entries = Object.entries(results);


  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 rounded-3xl border border-dashed border-muted-foreground/40 bg-card/60 px-8 py-16 text-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Dashboard
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            ダッシュボードを利用するにはログインが必要です
          </h1>
          <p className="text-sm text-muted-foreground">
            ログインまたは新規登録すると、進捗サマリーや演習ドリルが表示されます。
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SignInButton
            mode="modal"
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
          >
            <Button size="lg" className="px-6">
              ログイン
            </Button>
          </SignInButton>
          <SignUpButton
            mode="modal"
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
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
      <header className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          G検定ダッシュボード
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              進捗サマリー
            </h1>
            <p className="text-sm text-muted-foreground">
              学習状況・模試結果・弱点を一目で確認できます。
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="inline-flex h-3 w-3 rounded-sm bg-emerald-400/70" />
              高
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex h-3 w-3 rounded-sm bg-indigo-400/70" />
              中
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex h-3 w-3 rounded-sm bg-slate-300/70 dark:bg-slate-700/70" />
              低
            </div>
          </div>
        </div>
      </header>

      {/* 1. 全体の進捗サマリー */}
      <Card className="border border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle>進捗サマリー</CardTitle>
          <CardDescription>進捗指標のみにフォーカスした集計</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-6 pt-0 sm:grid-cols-2 lg:grid-cols-5">
          {paceSummary.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border/60 bg-muted/40 p-4 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {item.value}
              </p>
              <p className="text-xs text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[2fr_1.2fr]">
        {/* 習慣ヒートマップ + カウントダウン */}
        <Card className="border border-primary/15 bg-card">
          <CardHeader>
            <CardTitle>学習習慣ヒートマップ（過去6週）</CardTitle>
            <CardDescription>
              1マス=1日の学習セッション。濃いほど積み重ねています。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[300px] grid grid-cols-7 gap-1 rounded-lg border border-border/60 bg-muted/40 p-2">
                {heatmap.map((row, rowIndex) => (
                  <div
                    key={`row-${rowIndex}`}
                    className="grid grid-cols-7 gap-1"
                  >
                    {row.map((value, colIndex) => (
                      <div
                        key={`cell-${rowIndex}-${colIndex}`}
                        className={cn(
                          'h-5 w-5 rounded-sm transition-colors',
                          value >= 4
                            ? 'bg-emerald-400/80 dark:bg-emerald-500/80'
                            : value >= 2
                            ? 'bg-indigo-400/80 dark:bg-indigo-500/80'
                            : value >= 1
                            ? 'bg-slate-300/80 dark:bg-slate-600/80'
                            : 'bg-slate-200/70 dark:bg-slate-800/70'
                        )}
                        title={`${value} セッション`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              1セッション =
              25分集中。スマホでは横スクロールで全期間を確認できます。
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>試験日カウントダウン & 合格予測</CardTitle>
              <CardDescription>
                直近の学習ペースと正答率から概算
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/40 p-4">
                <Calendar className="h-6 w-6 text-indigo-500" />
                <div>
                  <p className="text-sm text-muted-foreground">残り日数</p>
                  <p className="text-2xl font-semibold">32日</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/40 p-4">
                <Brain className="h-6 w-6 text-emerald-500" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    合格可能性スコア
                  </p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-semibold">78%</p>
                    <Badge variant="default" className="gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      +4.2%
                    </Badge>
                  </div>
                  <Progress value={78} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 2. 各章ごとの進捗 */}
      <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-[1.6fr_1fr]">
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>章ごとの進捗</CardTitle>
            <CardDescription>
              公式シラバスに沿った理解度（モック）
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {syllabus.map((item) => (
              <div key={item.title}>
                <div className="flex items-center justify-between text-sm">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <Progress value={item.value} className="mt-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>理解バランス（レーダー）</CardTitle>
            <CardDescription>
              章横断の理解度バランスを可視化（モック）
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="w-full overflow-x-auto">
              <svg
                viewBox="0 0 280 260"
                className="mx-auto h-[320px] min-w-[260px] text-muted-foreground"
              >
                <g transform="translate(140,130)" className="text-border">
                  {[0, 1, 2, 3].map((i) => (
                    <polygon
                      key={i}
                      points={[...Array(radarPoints.length).keys()]
                        .map((idx) => {
                          const angle =
                            (Math.PI * 2 * idx) / radarPoints.length -
                            Math.PI / 2;
                          const r = 35 + i * 25;
                          return `${r * Math.cos(angle)},${
                            r * Math.sin(angle)
                          }`;
                        })
                        .join(' ')}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  ))}
                  <polygon
                    points={radarPoints
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      .map(([val]: any, idx) => {
                        const angle =
                          (Math.PI * 2 * idx) / radarPoints.length -
                          Math.PI / 2;
                        const r = (val / 100) * 90 + 20;
                        return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
                      })
                      .join(' ')}
                    className="fill-indigo-500/30 stroke-indigo-500"
                    strokeWidth="2"
                  />
                </g>
                <g
                  transform="translate(140,130)"
                  className="text-[10px] fill-foreground"
                >
                  {radarPoints.map(([, label], idx) => {
                    const angle =
                      (Math.PI * 2 * idx) / radarPoints.length - Math.PI / 2;
                    const r = 130;
                    const x = r * Math.cos(angle);
                    const y = r * Math.sin(angle);
                    return (
                      <text
                        key={label}
                        x={x}
                        y={y}
                        textAnchor={
                          Math.abs(Math.cos(angle)) < 0.1
                            ? 'middle'
                            : x > 0
                            ? 'start'
                            : 'end'
                        }
                        dy="0.35em"
                      >
                        {label}
                      </text>
                    );
                  })}
                </g>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. 問題演習（模試/過去問） */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>模試スコア推移</CardTitle>
            <CardDescription>最新3回分の結果（モック）</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-3">
              {mockScores.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-border/60 bg-muted/40 p-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{item.score}</p>
                  <Badge
                    variant={item.up ? 'default' : 'secondary'}
                    className="mt-2 gap-1"
                  >
                    {item.up ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {item.delta}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/40 p-4">
              <svg
                viewBox="0 0 300 100"
                className="h-28 w-full text-indigo-500"
              >
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  points="10,80 60,60 110,72 160,55 210,48 260,52 300,40"
                />
                {[10, 60, 110, 160, 210, 260, 300].map((x, idx) => (
                  <circle
                    key={x}
                    cx={x}
                    cy={[80, 60, 72, 55, 48, 52, 40][idx]}
                    r="4"
                  />
                ))}
              </svg>
              <p className="mt-2 text-xs text-muted-foreground">
                模試スコア推移（モックデータ）
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>誤答・未着手カテゴリ</CardTitle>
            <CardDescription>弱点と復習キューをストック</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                誤答が多い
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {mistakeCategories.map((c) => (
                  <Badge key={c} variant="outline">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">未着手</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {backlog.map((c) => (
                  <Badge key={c} variant="secondary">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/40 p-3 text-sm text-muted-foreground">
              間違えた問題は自動で復習キューに保存されます。
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. 学習ログ */}
      <Card className="border border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>学習ログ</CardTitle>
            <CardDescription>
              何を・どれだけやったかのタイムライン
            </CardDescription>
          </div>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-4 w-4" />
            Latest
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeline.map((t) => (
            <div
              key={t.date}
              className="flex flex-col gap-1 rounded-lg border border-border/60 bg-muted/40 px-4 py-3 md:flex-row md:items-center md:justify-between"
            >
              <span className="text-sm font-semibold text-foreground">
                {t.date}
              </span>
              <span className="text-sm text-muted-foreground">{t.content}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 5. 弱点分析 */}
      <Card className="border border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>弱点分析（AI）</CardTitle>
            <CardDescription>
              苦手トピックや原因、今日の優先学習を提示
            </CardDescription>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-4 w-4" />
            AI Insight
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-3">
          {weaknesses.map((w) => (
            <div
              key={w.title}
              className="rounded-lg border border-border/60 bg-muted/40 p-4 text-sm text-foreground"
            >
              <p className="text-sm font-semibold">{w.title}</p>
              <p className="mt-2 text-muted-foreground">{w.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 6. バッジ */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>達成バッジ</CardTitle>
          <CardDescription>
            モチベーションを維持するゲーミフィケーション
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {badges.map(({ title, icon: Icon }) => (
            <Badge
              key={title}
              variant="outline"
              className="gap-2 border-border/70 bg-muted/40 px-3 py-2"
            >
              <Icon className="h-4 w-4" />
              {title}
            </Badge>
          ))}
        </CardContent>
      </Card>

      {/* 7. AIニュース + 8. メモ */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>AI 最新ニュース</CardTitle>
              <CardDescription>
                シラバスや業界動向に関係するアップデート
              </CardDescription>
            </div>
            <Badge variant="outline" className="gap-1">
              <Newspaper className="h-4 w-4" />
              {newsLoading ? '読み込み中...' : 'Live feed'}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {newsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Spinner className="h-6 w-6 text-muted-foreground" />
              </div>
            ) : news.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                ニュースが見つかりませんでした
              </div>
            ) : (
              news.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="flex flex-col gap-1 rounded-lg border border-border/60 bg-muted/40 px-4 py-3 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex-1">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-foreground hover:underline"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <p className="text-base font-semibold text-foreground">
                        {item.title}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {item.detail}
                    </p>
                  </div>
                  {item.time && (
                    <span className="text-xs text-muted-foreground md:ml-4">
                      {item.time}
                    </span>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>質問メモ / 気づきノート</CardTitle>
            <CardDescription>後から復習できるようにメモを集約</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {notes.map((n) => (
              <div
                key={n.title}
                className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3 text-sm"
              >
                <p className="font-semibold text-foreground">{n.title}</p>
                <p className="text-muted-foreground">{n.detail}</p>
              </div>
            ))}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ListChecks className="h-4 w-4" />
              ChatGPTへの質問・気づきをここに追記すると復習しやすくなります。
            </div>
          </CardContent>
        </Card>
      </div>
      {/* 最新ドリル結果 */}
      <Card className="border border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>最新ドリル結果</CardTitle>
            <CardDescription>
              各チャプターの最新の演習結果を表示
            </CardDescription>
          </div>
          <Badge variant="outline" className="gap-1">
            <Trophy className="h-4 w-4" />
            {entries.length}件
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {entries.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              ドリル結果がありません
            </div>
          ) : (
            entries.map(([chapterSlug, result]) => (
              <div
                key={chapterSlug}
                className="flex flex-col gap-1 rounded-lg border border-border/60 bg-muted/40 px-4 py-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex-1">
                  <p className="text-base font-semibold text-foreground">
                    チャプター: {chapterSlug}
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      スコア: <span className="font-semibold text-foreground">{result.score}</span>
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground md:ml-4">
                  {new Date(result.performedAt).toLocaleString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
