import { MCQQuestion } from '@/components/assessment/mcq-runner';

export type DrillChapter = {
  slug: string;
  title: string;
  description: string;
  questions: MCQQuestion[];
  score?: number; // percentage when taken
};

function createQuestionSet(prefix: string): MCQQuestion[] {
  return Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    return {
      prompt: `${prefix}（問題 ${num}）`,
      choices: [
        `選択肢A-${num}`,
        `選択肢B-${num}`,
        `選択肢C-${num}`,
        `選択肢D-${num}`,
      ] as [string, string, string, string],
      answerIndex: (num - 1) % 4,
    };
  });
}

export const drillChapters: DrillChapter[] = [
  {
    slug: 'chapter-1',
    title: '第1章 人工知能とは - ドリル',
    description: 'AIの定義と代表例を復習する20問',
    questions: createQuestionSet('人工知能の基礎を確認'),
  },
  {
    slug: 'chapter-2',
    title: '第2章 動向 - ドリル',
    description: 'AIの歴史とブームを押さえる20問',
    questions: createQuestionSet('AIブームと社会動向を復習'),
    score: 78,
  },
  {
    slug: 'chapter-3',
    title: '第3章 手法 - ドリル',
    description: '機械学習アルゴリズム中心の20問',
    questions: createQuestionSet('機械学習アルゴリズムの比較'),
  },
  {
    slug: 'chapter-4',
    title: '第4章 ディープラーニング概要 - ドリル',
    description: 'ニューラルネットの構造や学習の20問',
    questions: createQuestionSet('深層学習の基本構造を確認'),
    score: 65,
  },
  {
    slug: 'chapter-5',
    title: '第5章 要素技術 - ドリル',
    description: 'CNN/RNNなど要素技術の20問',
    questions: createQuestionSet('要素技術のキーワード'),
  },
  {
    slug: 'chapter-6',
    title: '第6章 応用例 - ドリル',
    description: 'ユースケースと評価指標に関する20問',
    questions: createQuestionSet('応用例と評価指標'),
    score: 82,
  },
  {
    slug: 'chapter-7',
    title: '第7章 社会実装 - ドリル',
    description: 'MLOpsやガバナンスの20問',
    questions: createQuestionSet('社会実装と運用'),
  },
  {
    slug: 'chapter-8',
    title: '第8章 法律と倫理 - ドリル',
    description: 'AI倫理・法制度を確認する20問',
    questions: createQuestionSet('法律と倫理のポイント'),
    score: 74,
  },
  {
    slug: 'chapter-9',
    title: '第9章 用語集 - ドリル',
    description: '横断的な重要用語チェック',
    questions: createQuestionSet('用語と定義'),
  },
];
