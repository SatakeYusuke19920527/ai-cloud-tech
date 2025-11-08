import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | AI Cloud Tech',
  description:
    'AI Cloud Techのプライバシーポリシー。個人情報の取り扱い方針やお問い合わせ窓口について記載しています。',
  openGraph: {
    title: 'プライバシーポリシー | AI Cloud Tech',
    description:
      'AI Cloud Techのプライバシーポリシー。個人情報の取り扱い方針やお問い合わせ窓口について記載しています。',
    type: 'article',
    locale: 'ja_JP',
  },
};

const sections = [
  {
    title: '1. 適用範囲',
    body: '本ポリシーは、AI Cloud TechのWebアプリケーション、API、サポート窓口を通じて取得した全ての利用者情報に適用されます。',
  },
  {
    title: '2. 取得する情報',
    body: `・アカウント情報（氏名、メールアドレス、プロフィール画像 など）
・契約情報（プラン種別、支払ステータス、請求履歴）
・学習データ（学習ログ、演習結果、模試スコア、メモ）
・技術情報（IPアドレス、ブラウザ種別、デバイス識別子、Cookie 等）
・お問い合わせ情報（質問内容、添付ファイル、サポート履歴）`,
  },
  {
    title: '3. 利用目的',
    body: `1. 学習コンテンツや模試の提供・改善
2. レコメンドや進捗レポートの提示
3. 本人確認、不正利用の監視
4. 料金請求、決済処理、更新案内
5. お知らせやアンケート、マーケティング連絡（配信停止可能）
6. 法令または契約に基づく義務の履行、トラブル対応`,
  },
  {
    title: '4. 第三者提供・共同利用',
    body: '法令に基づく場合を除き、事前同意なく個人情報を第三者に提供しません。決済処理・認証・解析などを行う業務委託先とは、必要な範囲で共同利用し、適切な契約を締結します。',
  },
  {
    title: '5. Cookie・解析技術',
    body: 'サービス品質向上のため、Cookieやローカルストレージ等のトラッキング技術を使用します。ブラウザ設定で無効化できますが、一部機能が利用できなくなる場合があります。',
  },
  {
    title: '6. 情報の保管と安全管理',
    body: 'アクセス制御、暗号化、監査ログなどの安全管理措置を講じ、不要となったデータは法令や業界基準に従い削除・匿名化します。',
  },
  {
    title: '7. 利用者の権利',
    body: '利用者は、所定の手続きにより保有個人データの開示・訂正・利用停止・削除を請求できます。請求時には本人確認を実施します。',
  },
  {
    title: '8. 未成年者の利用',
    body: '18歳未満の利用者は、保護者の同意を得た上でサービスを利用してください。',
  },
  {
    title: '9. 法令遵守と継続的改善',
    body: '関連法令・ガイドラインを遵守し、本ポリシーや運用体制を継続的に見直し、改善します。',
  },
  {
    title: '10. プライバシーポリシーの変更',
    body: '内容を改定する場合、本ページで告知し、重要な変更がある際はメールやアプリ内通知でもお知らせします。改定後にサービスを利用された場合、変更に同意いただいたものとみなします。',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#05070a] dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Privacy Policy
          </p>
          <h1 className="text-4xl font-semibold">
            AI Cloud Tech プライバシーポリシー
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            最終更新日: 2025年3月31日
          </p>
          <p className="text-base text-slate-600 dark:text-slate-300">
            AI Cloud Tech（以下「当サービス」）は、G検定対策を安心して行っていただけるよう、以下の方針に基づき利用者情報を取り扱います。
          </p>
        </header>

        <main className="mt-12 space-y-10">
          {sections.map((section) => (
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
