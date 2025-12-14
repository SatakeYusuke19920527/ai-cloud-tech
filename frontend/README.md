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

- Checkout Session を作成し、`metadata.clerkId` を付与
- 決済完了後は Webhook のみで DB 反映（Success ページでは更新しない）
- Subscription 更新/解約イベントも Webhook で同期
- Next.js API: セッション作成のみ / Stripe: 決済・継続課金・Webhook / Cosmos: 購読状態を保存

---

## 3. 決済フローの詳細解説

### 3.1 Checkout Session の生成（`/api/checkout_sessions`）

```ts
// settings/page.tsx → 購入ボタン
<form action="/api/checkout_sessions" method="POST">
  <input type="hidden" name="clerkId" value={userId ?? ''} />
  <Button type="submit" className="w-full" size="lg">
    プランを購入する
  </Button>
</form>;

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

- Success ページは表示のみで DB 更新なし（Webhook を唯一の真実とする）

### 3.3 Subscription の更新/解約フロー

```ts
// /api/stripe/webhook/route.ts (customer.subscription.updated / deleted)
const isActive = sub.status === 'active' || sub.status === 'trialing';
const expiresAt = new Date(sub.current_period_end * 1000).toISOString();
await updateSubscription(clerkId, isActive, subscriptionId, expiresAt);
```

- `subscriptionId` で Cosmos を逆引きし、`isSubscribed` と期限を同期

### 3.4 成功時の UI 表示（参考）

- `success/page.tsx`: DB 更新せず完了メッセージのみ表示

---

## 4. Cosmos DB で管理するフィールド設計（user コンテナ）

- `subscriptionId`: Stripe Subscription ID（解約後も保持）
- `isSubscribed`: Stripe `status` に同期
- `subscriptionPurchasedAt`: 初回購入日時
- `subscriptionExpiresAt`: Stripe `current_period_end` を ISO で保存
- `subscriptionCancelledAt`: アプリ側の解約操作時に設定  
  **保持戦略**: Webhook で上書きし、Stripe の値を真実のソースとする

---

## 5. Webhook 実装のポイント

### 5.1 署名検証

- `stripe-signature` と `STRIPE_WEBHOOK_SECRET` による検証は必須

### 5.2 主要イベントの処理例

- `checkout.session.completed` → 初回購読を確定し、期限と ID を保存
- `customer.subscription.updated` / `deleted` → ステータスと期限を同期

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

## API まとめ

- Stripe の期間終了日時をそのまま Cosmos に保存して整合性を担保
- 次のステップ: Billing Portal 連携、Webhook 冗長化、ログ基盤の整備

---

## API まとめ

主要な Next.js API エンドポイントと役割（`src/app/api` 配下）。

- `/api/checkout_sessions` (POST)

  - 役割: Stripe Checkout Session を作成し、Checkout ページにリダイレクト。`metadata.clerkId` を付与。
  - 主な入力: formData: `clerkId`
  - 関連ファイル: `app/api/checkout_sessions/route.ts`

- `/api/stripe/webhook` (POST)

  - 役割: Stripe Webhook の受信口。`checkout.session.completed` / `customer.subscription.updated` / `deleted` を処理し、Cosmos DB の購読状態を同期。
  - 主な処理: `updateSubscription(clerkId, isActive, subscriptionId, expiresAt)`
  - 関連ファイル: `app/api/stripe/webhook/route.ts`

- `/api/user/subscription` (GET)

  - 役割: ログインユーザーの購読状態と有効期限を返却。Clerk 認証必須。
  - 関連ファイル: `app/api/user/subscription/route.ts`

- `/api/user/subscription/cancel` (POST)

  - 役割: 購読の自動更新停止（解約）。Cosmos DB のユーザーを更新し、Stripe の subscription を `cancel_at_period_end: true` で停止。Clerk 認証必須。
  - 関連ファイル: `app/api/user/subscription/cancel/route.ts`, `lib/cosmos/user.ts`

- `/api/summary-memorize` (GET/POST)

  - 役割: 要点整理の暗記状態を取得・保存（GFM の markdown 表示に対応）。
  - GET: `?userId&chapterSlug` でマップを返却 / POST: `{ userId, chapterSlug, term, isMemorized }` を upsert。
  - 関連ファイル: `app/api/summary-memorize/route.ts`, `lib/cosmos/summary.ts`

- `/api/drill/result` (POST)
  - 役割: ドリル受験結果を Cosmos DB（`drill` コンテナ）に保存。Clerk 認証必須。
  - 主な入力: `{ chapterSlug, score, correct, total }`（ユーザー ID は Clerk で取得）
  - 関連ファイル: `app/api/drill/result/route.ts`, `lib/cosmos/drill.ts`

````md
# Markdown 記法ガイド（一般的な記法＋拡張記法）

本プロジェクトでは、**一般的な Markdown 記法** に加えて、
`react-markdown` + `remark-directive` による **独自の拡張記法** を利用できます。

この README では、
- 普通の Markdown の書き方
- 本プロジェクト独自の `:::` 記法

の両方をまとめて説明します。

---

## 1. 一般的な Markdown 記法

### 見出し

```md
# 見出し1
## 見出し2
### 見出し3
````

---

### 段落

```md
これは段落です。

空行を挟むと次の段落になります。
```

---

### 強調

```md
**太字**
*斜体*
```

---

### リンク

```md
[example](example.com)
```

---

### リスト

```md
- 箇条書き1
- 箇条書き2

1. 番号付き1
2. 番号付き2
```

---

### 引用

```md
> これは引用文です
```

---

### コード

#### インラインコード

```md
`const a = 1;`
```

#### コードブロック

````md
```ts
const hello = "world";
````

````

---

### 画像

```md
![代替テキスト](example.png)
````

サイズ指定も可能です。

```md
![代替テキスト](example.png =250x150)
```

---

### 表（GFM）

```md
| 列1 | 列2 |
|----|----|
| A | B |
```

---

## 2. 本プロジェクト独自の拡張記法（::: コンテナ）

`:::` で囲むことで、特定の意味を持つメッセージボックスを表現できます。

### 基本構文

```md
:::種類
内容を書く
:::
```

* `種類` によって表示スタイルが変わります
* 中では通常の Markdown が使用できます

---

### message（通常メッセージ）

補足説明や案内文に使用します。

```md
:::message
これは通常のメッセージです。
:::
```

---

### warning（注意）

注意喚起やリスクの説明に使用します。

```md
:::warning
⚠️ この操作には注意してください。
:::
```

---

### alert（重大な警告）

取り消し不可・重大な警告に使用します。

```md
:::alert
🚨 この操作は元に戻せません。
:::
```

---

### success（成功・完了）

処理の成功や完了メッセージに使用します。

```md
:::success
✅ 正常に保存されました。
:::
```

---

## 3. 注意事項

* 拡張記法（`:::`）は GitHub README 上では通常のテキストとして表示されます
* アプリ上では専用のデザインが適用されます
* コンテナのネスト（`:::` の中に `:::`）は非推奨です

---

## 4. 開発者向け補足

この Markdown 拡張は以下で実装されています。

* `react-markdown`
* `remark-gfm`
* `remark-directive`

`remark-directive` により `:::xxx` 構文を解析し、
対応する React コンポーネントにマッピングしています。

---

## 5. 拡張の追加方法

新しい種類を追加したい場合は、
Markdown コンポーネント定義にキーを追加してください。

例：

```md
:::info
情報メッセージ
:::
```





