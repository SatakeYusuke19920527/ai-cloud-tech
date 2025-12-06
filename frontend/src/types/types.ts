import { MCQQuestion } from '@/components/assessment/mcq-runner';

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface User {
  id: string; // clerkId と同じ
  clerkId: string; // Clerk のユーザーID
  email: string; // メールアドレス
  createdAt: string; // ISO形式の作成日
  isSubscribed: boolean; // サブスク加入中かどうか
  subscriptionPurchasedAt: string | null; // 購入日 (ISO)
  subscriptionExpiresAt: string | null; // 終了日 (ISO)
}

export type SummaryChapter = {
  slug: string;
  title: string;
  description: string;
  keywords: {
    term: string;
    meaning: string;
  }[];
};

export type DrillChapter = {
  slug: string;
  title: string;
  description: string;
  questions: MCQQuestion[];
  score?: number; // percentage when taken
};

export type DrillType = {
  chapterSlug: string;
  questionIndex: number;
  prompt: string;
  choices: [string, string, string, string];
  answerIndex: number;
  selectedIndex: number;
  correct: boolean;
  explanation?: string;
};
