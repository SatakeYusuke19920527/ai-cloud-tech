import { MCQQuestion } from '@/components/assessment/mcq-runner';

export type ActualExam = {
  slug: string;
  title: string;
  description: string;
  score?: number;
  questions: MCQQuestion[];
};

function createQuestionSet(prefix: string): MCQQuestion[] {
  return Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    return {
      prompt: `${prefix}（本番対策 問題 ${num}）`,
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

export const actualExams: ActualExam[] = [
  {
    slug: 'set-1',
    title: '本番対策セット 1',
    description: '基礎と頻出問題の総復習セット。',
    score: 75,
    questions: createQuestionSet('セット1'),
  },
  {
    slug: 'set-2',
    title: '本番対策セット 2',
    description: '応用・社会実装の実戦問題を中心に収録。',
    score: 81,
    questions: createQuestionSet('セット2'),
  },
  {
    slug: 'set-3',
    title: '本番対策セット 3',
    description: '難易度高めの応用セット。弱点補強に最適。',
    questions: createQuestionSet('セット3'),
  },
  {
    slug: 'set-4',
    title: '本番対策セット 4',
    description: '試験直前の総仕上げ用フルセット。',
    questions: createQuestionSet('セット4'),
  },
];
