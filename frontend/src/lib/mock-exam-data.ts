import { MCQQuestion } from '@/components/assessment/mcq-runner';

export type MockExam = {
  slug: string;
  title: string;
  description: string;
  score?: number;
  questions: MCQQuestion[];
};

function createMockQuestionSet(prefix: string) {
  return Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    return {
      prompt: `${prefix}（模試 問題 ${num}）`,
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

export const mockExams: MockExam[] = [
  {
    slug: 'mock-1',
    title: '第1回 模試',
    description: '初回の実力チェック。頻出トピックと基礎力を確認。',
    score: 72,
    questions: createMockQuestionSet('第1回 模試の設問'),
  },
  {
    slug: 'mock-2',
    title: '第2回 模試',
    description: '応用問題中心。社会実装や事例問題を多く含む構成。',
    score: 68,
    questions: createMockQuestionSet('第2回 模試の設問'),
  },
  {
    slug: 'mock-3',
    title: '第3回 模試',
    description: '難易度やや高。最新トピックを重点的に出題。',
    questions: createMockQuestionSet('第3回 模試の設問'),
  },
  {
    slug: 'mock-4',
    title: '第4回 模試',
    description: '総仕上げ用の最終模試。全範囲を網羅した構成。',
    questions: createMockQuestionSet('第4回 模試の設問'),
  },
];
