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
