import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '利用規約 | AI Cloud Tech',
  description:
    'AI Cloud Techの利用規約。サービス利用にあたっての条件や禁止事項、免責などを記載しています。',
  openGraph: {
    title: '利用規約 | AI Cloud Tech',
    description:
      'AI Cloud Techの利用規約。サービス利用にあたっての条件や禁止事項、免責などを記載しています。',
    type: 'article',
    locale: 'ja_JP',
  },
};

const termsSections = [
  {
    title: '第1条（適用）',
    body:
      '本規約は、AI Cloud Tech（以下「当サービス」）の利用に関わる一切の行為に適用され、利用者は本規約に同意したうえで当サービスを利用するものとします。',
  },
  {
    title: '第2条（アカウント）',
    body:
      '利用者は、正確かつ最新の情報で登録を行い、認証情報を自己の責任で管理します。第三者による不正利用が疑われる場合、速やかに当サービスへ連絡してください。',
  },
  {
    title: '第3条（禁止事項）',
    body: `・法令または公序良俗に違反する行為
・知的財産権・プライバシー権を侵害する行為
・当サービスの運営を妨害する行為
・アカウントの貸与、譲渡、共有
・自動化ツール等による過度な負荷を与える行為
・当サービスが不適切と判断する行為`,
  },
  {
    title: '第4条（有償プランと支払）',
    body:
      '有償プランの料金、支払方法、解約条件は別途提示するプラン詳細に従います。途中解約時の返金の有無も同規定に従います。',
  },
  {
    title: '第5条（コンテンツの取り扱い）',
    body:
      '当サービスが提供する教材・模試・解析レポート等のコンテンツは、利用者本人の学習目的に限定して利用できます。無断転載・商用利用は禁止です。',
  },
  {
    title: '第6条（サービス提供の停止・変更）',
    body:
      '当サービスは、メンテナンスや不可抗力、システム障害等により、事前通知なくサービスの全部または一部を停止・変更する場合があります。',
  },
  {
    title: '第7条（免責）',
    body:
      '当サービスは、利用者がサービスを通じて得た情報の正確性・有用性・適法性を保証しません。利用者が被った損害については、当サービスに故意または重過失がある場合を除き責任を負いません。',
  },
  {
    title: '第8条（損害賠償）',
    body:
      '利用者が本規約に違反し、当サービスまたは第三者に損害を与えた場合、当該利用者は賠償責任を負います。',
  },
  {
    title: '第9条（利用停止・契約解除）',
    body:
      '当サービスは、利用者が本規約に違反した場合、事前通知なくアカウント停止または契約解除を行うことができます。',
  },
  {
    title: '第10条（規約の変更）',
    body:
      '本規約の内容を変更する場合、本ページに掲載し、重要な変更がある際はメールやアプリ内通知で周知します。変更後にサービスを利用した場合は、変更に同意したものとみなします。',
  },
  {
    title: '第11条（準拠法・裁判管轄）',
    body:
      '本規約は日本法に準拠します。当サービスに関して紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。',
  },
];

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#05070a] dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Terms of Use
          </p>
          <h1 className="text-4xl font-semibold">AI Cloud Tech 利用規約</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">最終更新日: 2025年3月31日</p>
          <p className="text-base text-slate-600 dark:text-slate-300">
            AI Cloud Tech（以下「当サービス」）の利用条件を定めるものです。ご利用前に必ずお読みください。
          </p>
        </header>

        <main className="mt-12 space-y-10">
          {termsSections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {section.title}
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {section.body}
              </p>
            </section>
          ))}
        </main>

        <footer className="mt-12 flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="text-sm text-indigo-600 hover:underline">
            ← トップページへ戻る
          </Link>
        </footer>
      </div>
    </div>
  );
}
