import AuthButton from '@/components/auth/auth-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Cpu,
  Goal,
  Layers,
  LineChart,
  ListChecks,
  PenTool,
  Quote,
  Scale,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Cloud Tech | AI情報の最短キャッチアップサイト',
  description:
    'AI Cloud TechはAIの頻出トピックを体系化。要点→演習→模試のシンプルなフローで最短合格を支援します。',
  openGraph: {
    title: 'AI Cloud Tech | AI情報の最短キャッチアップサイト',
    description:
      '要点→演習→模試。AI Cloud Techで無駄のないAI情報のキャッチアップを。',
    type: 'website',
    locale: 'ja_JP',
  },
};

const featureItems = [
  {
    title: '基礎理論',
    description: '確率統計・線形代数・情報理論を演習とともに最短整理。',
    icon: Layers,
  },
  {
    title: '機械学習',
    description: '教師あり/なし、モデル評価、特徴量設計を図解で理解。',
    icon: Cpu,
  },
  {
    title: '深層学習',
    description: 'CNN・RNN・Transformerの構造と代表用途を比較。',
    icon: Brain,
  },
  {
    title: '応用・社会実装',
    description: 'MLOpsやケーススタディでビジネス活用まで把握。',
    icon: LineChart,
  },
  {
    title: '倫理・ガバナンス',
    description: 'AI倫理指針・ガイドラインを条文ベースで整理。',
    icon: Scale,
  },
  {
    title: '頻出用語集',
    description: '400語の要点を一行で検索できるライトリファレンス。',
    icon: BookOpen,
  },
];

const steps = [
  {
    title: '要点で理解',
    description: '一問一答形式で頻出テーマを素早く確認。',
    icon: ListChecks,
  },
  {
    title: '演習で定着',
    description: '出題傾向に合わせたミニドリルで即座に補強。',
    icon: PenTool,
  },
  {
    title: '模試で仕上げ',
    description: '本番形式の制限時間とスコア分析で弱点を可視化。',
    icon: Goal,
  },
];

const testimonials = [
  {
    name: '山本 優子',
    role: '外資コンサルタント',
    quote:
      '必要な情報だけが洗練されていて、出張の合間でも迷わず進められました。模試の分析コメントが特に良い。',
  },
  {
    name: '佐藤 拓真',
    role: 'AIエンジニア',
    quote:
      '体系化されたロードマップのおかげで、1ヶ月弱で合格。フィードバックが口語ではなく端的で信頼できる。',
  },
  {
    name: '河野 美咲',
    role: '事業開発',
    quote:
      '倫理・社会実装の整理が秀逸。資料を読むよりもはるかに効率が良かったです。',
  },
];

const faqs = [
  {
    question: '無料プランでも全部学べますか？',
    answer:
      '無料プランでは要点リストと演習の一部、模試1回を体験できます。フルアクセスはProで提供しています。',
  },
  {
    question: '模試の難易度は本番と比べてどうですか？',
    answer:
      '過去の出題傾向をもとに難易度を段階設定。本番のスコア分布を反映し、合格ライン70%を意識した問題構成です。',
  },
  {
    question: 'スマートフォンでも快適に使えますか？',
    answer:
      'レスポンシブUIとショートセッション前提で設計しているため、移動時間でもストレスなく学べます。',
  },
  {
    question: '学習データはどのくらい更新されますか？',
    answer:
      '直近のトレンドや試験範囲の改訂を追跡し、月次でコンテンツをアップデートします。',
  },
  {
    question: 'チーム導入や法人契約は可能ですか？',
    answer:
      'はい。受講管理ダッシュボードとレポーティングを含む法人プランをご案内しています。',
  },
  {
    question: 'サポート体制は？',
    answer:
      '質問フォームから24時間以内にAI + 専門チームが回答します。模試のスコアレポートにも個別コメントを付与します。',
  },
];

const mockScores = [12, 28, 45, 60, 68, 72, 80, 86, 94];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-[#05070a] dark:text-slate-100">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hero-header{padding-block:1.5rem;}
            @supports (animation-timeline: scroll()) {
              .hero-header {
                animation: header-shrink both linear;
                animation-timeline: scroll(root);
                animation-range: 0 220px;
              }
              @keyframes header-shrink {
                to {
                  padding-block: 0.75rem;
                  background: color-mix(in srgb, #0b0f12 80%, transparent);
                  border-color: rgba(255,255,255,0.12);
                }
              }
            }
          `,
        }}
      />
      <header className="hero-header sticky top-0 z-30 border-b border-slate-900/5 bg-white/75 text-slate-900 backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-[#0b0f12]/80 dark:text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            AI Cloud Tech
          </Link>
          <div className="flex items-center gap-3">
            <AuthButton />
          </div>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-linear-to-r from-white/70 to-white/40 p-10 shadow-lg shadow-indigo-500/10 dark:from-[#111723] dark:to-[#0b0f12]">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
              G検定特化
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              G検定に最短合格。シンプルに、体系的に。
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
              頻出トピック→要点→演習→模試。無駄を削ぎ落とした学習体験。
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-indigo-600 px-10 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                <Link href="/dashboard">G検定の勉強を開始してみる</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-cyan-400" />
                <span>要点400本を2週間で</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-indigo-400" />
                <span>模試平均スコア +9.2%</span>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1018] p-10 shadow-xl shadow-cyan-500/20">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-linear-to-r from-indigo-500/50 to-cyan-300/60 blur-3xl" />
            <div className="absolute bottom-6 right-6 h-32 w-32 rounded-full border border-white/10" />
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Precision Matrix
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-slate-200">
                {['頻出', '演習', '模試'].map((label, index) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur"
                  >
                    <p className="text-3xl font-semibold">
                      {index === 0 ? '92%' : index === 1 ? '84%' : '76%'}
                    </p>
                    <p className="text-xs text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-white/10 bg-linear-to-r from-indigo-500/40 via-transparent to-cyan-300/30 p-6 text-slate-100">
                <p className="text-sm text-slate-300">Adaptive Focus</p>
                <p className="mt-2 text-2xl font-semibold">
                  弱点トピックを自動で再配分
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 text-sm text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            合格ロードマップ
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            {[
              'Step 1 要点整理',
              'Step 2 ドリル',
              'Step 3 演習模試',
              'Step 4 本番対策',
            ].map((item, idx) => (
              <div
                key={item}
                className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                <span className="h-8 w-8 rounded-full bg-indigo-100 text-center text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                  {idx + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="features">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                学べる内容
              </p>
              <h2
                id="features"
                className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white"
              >
                体系化された6つのモジュール
              </h2>
            </div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {featureItems.map(({ title, description, icon: Icon }) => (
              <Card
                key={title}
                className="border-slate-200/60 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="how-it-works">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                進め方
              </p>
              <h2
                id="how-it-works"
                className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white"
              >
                3ステップで集中と定着を
              </h2>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map(({ title, description, icon: Icon }) => (
              <Card
                key={title}
                className="border-slate-200/60 bg-linear-to-b from-white to-white/60 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 dark:border-white/10 dark:from-white/10 dark:to-transparent"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-4 text-2xl">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2" aria-labelledby="mock">
          <Card className="border-slate-200/60 bg-white/90 p-8 shadow-md dark:border-white/10 dark:bg-white/5">
            <CardHeader className="p-0">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                模試ブロック
              </p>
              <CardTitle id="mock" className="mt-2 text-3xl">
                スコア分布を瞬時に把握
              </CardTitle>
              <CardDescription>
                ダミーデータで動作する可視化。実際は本番受験者データから推定。
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-8 grid gap-6 p-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-6 dark:border-white/10 dark:bg-white/5">
                <svg viewBox="0 0 220 140" className="h-40 w-full">
                  {mockScores.map((score, idx) => (
                    <rect
                      key={idx}
                      x={idx * 22 + 8}
                      y={140 - score}
                      width="16"
                      height={score}
                      rx="4"
                      className="fill-indigo-500/70"
                    />
                  ))}
                  <line
                    x1="0"
                    y1="80"
                    x2="220"
                    y2="80"
                    stroke="#22D3EE"
                    strokeDasharray="6 6"
                  />
                  <text x="10" y="70" fontSize="10" fill="#22D3EE">
                    合格ライン 60 点
                  </text>
                </svg>
              </div>
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white/80 p-6 dark:border-white/10 dark:bg-white/10">
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
                    推奨アクション
                  </p>
                  <p className="mt-2 text-lg text-slate-800 dark:text-white">
                    弱点：倫理・社会実装
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-300">
                    推定加点 +6.4% / 45分
                  </p>
                </div>
                <Button className="mt-6 h-12 rounded-full bg-cyan-400 text-slate-900 hover:bg-cyan-300">
                  無料模試を受ける
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200/60 bg-white/90 p-8 shadow-md dark:border-white/10 dark:bg-white/5">
            <CardHeader className="p-0">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                受講者の声
              </p>
              <CardTitle className="mt-2 text-3xl">信頼される設計</CardTitle>
              <CardDescription>
                忙しい社会人でも狙うスコアへ一直線。
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-8 grid gap-4 p-0">
              {testimonials.map(({ name, role, quote }) => (
                <div
                  key={name}
                  className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/10"
                >
                  <Quote className="h-5 w-5 text-indigo-400" />
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-200">
                    {quote}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                    {name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {role}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="faq" className="pb-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                FAQ
              </p>
              <h2
                id="faq"
                className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white"
              >
                よくある質問
              </h2>
            </div>
          </div>
          <Accordion type="single" collapsible className="mt-8 space-y-4">
            {faqs.map(({ question, answer }, idx) => (
              <AccordionItem
                key={question}
                value={`item-${idx}`}
                className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 px-4 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:text-indigo-600 dark:text-white">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-600 dark:text-slate-300">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <footer className="border-t border-slate-200/60 bg-white/80 py-8 text-sm text-slate-500 dark:border-white/10 dark:bg-[#070a0d] dark:text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-center md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} AI Cloud Tech. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <Link href="/privacy-policy" className="hover:text-indigo-500">
              プライバシーポリシー
            </Link>
            <Link href="/terms-of-use" className="hover:text-indigo-500">
              利用規約
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
