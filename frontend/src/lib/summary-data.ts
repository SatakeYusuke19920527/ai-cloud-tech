export type SummaryChapter = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
};

export const summaryChapters: SummaryChapter[] = [
  {
    slug: 'chapter-1',
    title: '第1章 人工知能とは',
    description: 'AIの定義や弱いAI/強いAIなど基本概念を整理',
    keywords: ['人工知能', '弱いAI', '強いAI', '超知能', 'チューリングテスト'],
  },
  {
    slug: 'chapter-2',
    title: '第2章 人工知能をめぐる動向',
    description: 'AIブームの歴史と社会的背景を俯瞰',
    keywords: ['第1次AIブーム', 'エキスパートシステム', 'ディープラーニング', 'GPU', 'データ駆動'],
  },
  {
    slug: 'chapter-3',
    title: '第3章 機械学習の具体的手法',
    description: '教師あり/なし学習や代表アルゴリズムの要点',
    keywords: ['教師あり学習', '教師なし学習', 'SVM', '決定木', 'k-means'],
  },
  {
    slug: 'chapter-4',
    title: '第4章 ディープラーニングの概要',
    description: 'ニューラルネットワークの基本構造と学習プロセス',
    keywords: ['パーセプトロン', '活性化関数', '誤差逆伝播', '勾配消失', '正則化'],
  },
  {
    slug: 'chapter-5',
    title: '第5章 ディープラーニングの要素技術',
    description: '主要アーキテクチャや最適化テクニックの用語集',
    keywords: ['CNN', 'RNN', 'Attention', 'Batch Normalization', 'Dropout'],
  },
  {
    slug: 'chapter-6',
    title: '第6章 ディープラーニングの応用例',
    description: '代表的なユースケースと評価指標を整理',
    keywords: ['画像認識', '音声認識', '自然言語処理', '強化学習', 'ROC/AUC'],
  },
  {
    slug: 'chapter-7',
    title: '第7章 AIの社会実装に向けて',
    description: 'MLOpsや社会実装プロセスのキーワード',
    keywords: ['PoC', 'MLOps', 'モデル監視', '説明可能性', 'データガバナンス'],
  },
  {
    slug: 'chapter-8',
    title: '第8章 AIの法律と倫理',
    description: '倫理ガイドラインやリスク対応の重要用語',
    keywords: ['AI倫理', 'プライバシー', 'バイアス', '透明性', 'アカウンタビリティ'],
  },
  {
    slug: 'chapter-9',
    title: '第9章 未来展望・用語集',
    description: '用語横断のチェックリストと最新トピック',
    keywords: ['生成AI', 'マルチモーダル', 'エッジAI', 'AutoML', 'サンドボックス'],
  },
];
