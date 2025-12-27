# Stripe の処理の流れについて

## 1. はじめに
- **構成**: Next.js (App Router) + Stripe Billing + Azure Cosmos DB  
- **採用理由**: Webhook による確実な決済反映、マネージド NoSQL の柔軟性、サーバーレスな拡張性  
- **想定読者**: Next.js/Stripe を使ってサブスク課金を実装し、NoSQL で購読状態を保持したい開発者

---

## 2. Stripe 決済の全体アーキテクチャ
### 2.1 システム構成図
```mermaid
flowchart LR
  A[Next.js App (UI)] -->|POST clerkId| B[/api/checkout_sessions/]
  B -->|Create Session| S[(Stripe)]
  S -->|Redirect| A
  S -->|Webhook events| W[/api/stripe/webhook/]
  W -->|upsert| C[(Cosmos DB user container)]
```

### 2.2 Checkout → Webhook → Cosmos DB の流れ
- Checkout Session 作成時に `metadata.clerkId` を付与
- 決済完了後は Webhook のみで DB 反映（Success ページでは更新しない）
- Subscription 更新/解約も Webhook で同期
- 役割: Next.js API = セッション生成のみ / Stripe = 決済と継続課金 / Cosmos = 購読状態を保存

---

## 3. 決済フローの詳細解説
### 3.1 Checkout Session の生成（`/api/checkout_sessions`）
```tsx
// settings/page.tsx → 購入フォーム
<form action="/api/checkout_sessions" method="POST">
  <input type="hidden" name="clerkId" value={userId ?? ''} />
  <Button type="submit" className="w-full" size="lg">プランを購入する</Button>
</form>
```
```ts
// /api/checkout_sessions/route.ts
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  metadata: { clerkId },
  success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
  line_items: [{ price: 'price_xxx', quantity: 1 }],
});
return NextResponse.redirect(session.url, 303);
```

### 3.2 Checkout 完了後の Webhook 通知
```ts
// /api/stripe/webhook/route.ts (checkout.session.completed)
const clerkId = session.metadata?.clerkId;
const subscriptionId = session.subscription as string;
const sub = await stripe.subscriptions.retrieve(subscriptionId);
const expiresAt = new Date(sub.current_period_end * 1000).toISOString();
await updateSubscription(clerkId, true, subscriptionId, expiresAt);
```
- Success ページでは DB 更新せず、表示のみ（Webhook を唯一の真実にする）

### 3.3 Subscription の更新/解約フロー
```ts
// /api/stripe/webhook/route.ts (customer.subscription.updated / deleted)
const isActive = sub.status === 'active' || sub.status === 'trialing';
const expiresAt = new Date(sub.current_period_end * 1000).toISOString();
await updateSubscription(clerkId, isActive, subscriptionId, expiresAt);
```
- `subscriptionId` で Cosmos を逆引きし、`isSubscribed` と期限を同期

### 3.4 成功時の UI 表示
- `success/page.tsx`: Webhook に任せ、DB 更新は行わずサンクス表示のみ

---

## 4. Cosmos DB で管理するフィールド設計（user コンテナ）
- `subscriptionId`: Stripe Subscription ID（解約後も保持）
- `isSubscribed`: Stripe `status` に同期
- `subscriptionPurchasedAt`: 初回購入日時
- `subscriptionExpiresAt`: `current_period_end` を ISO で保存
- `subscriptionCancelledAt`: アプリ側の解約操作時に設定  
- **保持戦略**: Webhook を唯一の真実とし、Stripe の値をそのまま同期

---

## 5. Webhook 実装のポイント
### 5.1 署名検証
- `stripe-signature` と `STRIPE_WEBHOOK_SECRET` による検証は必須

### 5.2 主要イベントの処理例
- `checkout.session.completed`: 初回購読を確定し、期限と ID を保存  
- `customer.subscription.updated` / `deleted`: ステータスと期限を同期

### 5.3 updateSubscription 呼び出し（擬似コード）
```ts
const isActive = sub.status === 'active' || sub.status === 'trialing';
const expiresAt = new Date(sub.current_period_end * 1000).toISOString();
await updateSubscription(clerkId, isActive, subscriptionId, expiresAt);
```

---

## 6. Cosmos DB のアーキテクチャ
- コンテナ構成  
  - `user`: 購読状態 (subscriptionId, isSubscribed, expiresAt, 期限メタ)  
  - `drill`: ドリル結果 (score, performedAt)  
  - `summary`: 暗記状態  
- 書き込みトリガー  
  - Webhook → `user`  
  - UI 操作 → `drill` / `summary`  
- 設計ポイント  
  - パーティションキーは `id`/`clerkId` でユーザー単位に集約  
  - Webhook は upsert でシンプルにし、RU を抑制

---

## 7. 実装時にハマりやすいポイント
- Success ページで DB 更新しない（離脱時に失敗するため）
- Webhook 署名検証エラー（ローカルは `stripe listen` のシークレットを使用）
- `subscriptionId` を保存しないと更新イベントでユーザー特定不可
- sandbox と本番での挙動差に注意（カード種別・イベント種類）

---

## 8. 運用ベストプラクティス
- Webhook ログを残し、500 応答で Stripe のリトライに備える
- Stripe Dashboard の「イベント」からペイロード確認・再送信を活用
- 失敗時アラートと再処理フローを用意する

---

## 9. まとめ
- Webhook を単一の真実として購読状態を同期  
- Stripe の期間終了日時をそのまま Cosmos に保存して整合性を担保  
- 次のステップ: Billing Portal 連携、Webhook 冗長化、ログ基盤の整備

