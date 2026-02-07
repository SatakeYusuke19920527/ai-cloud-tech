import { CosmosClient } from '@azure/cosmos';
import { stripe } from '@/lib/stripe';

/**
 * ユーザー作成
 */
export const createUser = async (clerkId: string, email: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cosmosClient = new CosmosClient(
        process.env.COSMOS_CONNECTION_STRING!
      );
      const database = cosmosClient.database(process.env.COSMOS_DATABASE_NAME!);
      const container = database.container(
        process.env.COSMOS_CONTAINER_NAME_USER!
      );

      // 新規のユーザードキュメントを作成
      const { resource } = await container.items.create({
        id: clerkId,
        clerkId: clerkId,
        email: email,
        createdAt: new Date().toISOString(),
        isSubscribed: false, // サブスク加入中かどうか（true / false）
        subscriptionPurchasedAt: null, // 購入日（ISO形式 or null）
        subscriptionExpiresAt: null, // サブスクの有効期限（ISO形式 or null）
        // 総学習時間（秒）
        totalStudySeconds: 0,
        // 受験日（YYYY-MM-DD or null）
        examDate: null,
      });

      // 作成したリソースを返却
      resolve(resource);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

/**
 * ユーザー更新
 *  - 例として email を更新
 *  - 必要に応じて他のフィールドも同様に更新可能
 */
export const updateUser = async (clerkId: string, newEmail: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cosmosClient = new CosmosClient(
        process.env.COSMOS_CONNECTION_STRING!
      );
      const database = cosmosClient.database(process.env.COSMOS_DATABASE_NAME!);
      const container = database.container(
        process.env.COSMOS_CONTAINER_NAME_USER!
      );

      // 更新対象のアイテムを取得
      const item = container.item(clerkId, clerkId);
      const { resource: existingUser } = await item.read();

      if (!existingUser) {
        // ユーザーが見つからなかった場合
        throw new Error(`User with id ${clerkId} not found.`);
      }

      // 更新フィールドをマージ
      const updatedUser = {
        ...existingUser,
        email: newEmail,
        updatedAt: new Date().toISOString(),
      };

      // 置換 (replace) で更新を実施
      const { resource } = await item.replace(updatedUser);
      resolve(resource);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/**
 * 受験日を更新
 * @param clerkId - ユーザーID（Clerk）
 * @param examDate - 受験日（YYYY-MM-DD）または null でクリア
 */
export const updateExamDate = async (
  clerkId: string,
  examDate: string | null
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cosmosClient = new CosmosClient(
        process.env.COSMOS_CONNECTION_STRING!
      );
      const database = cosmosClient.database(process.env.COSMOS_DATABASE_NAME!);
      const container = database.container(
        process.env.COSMOS_CONTAINER_NAME_USER!
      );

      const item = container.item(clerkId, clerkId);
      const { resource: existingUser } = await item.read();

      if (!existingUser) {
        throw new Error(`User with id ${clerkId} not found.`);
      }

      // 日付形式の検証（null または YYYY-MM-DD）
      let normalizedExamDate: string | null = null;
      if (examDate != null && typeof examDate === 'string' && examDate.trim() !== '') {
        const parsed = new Date(examDate.trim());
        if (!isNaN(parsed.getTime())) {
          normalizedExamDate = parsed.toISOString().slice(0, 10); // YYYY-MM-DD
        }
      }

      const updatedUser = {
        ...existingUser,
        examDate: normalizedExamDate,
        updatedAt: new Date().toISOString(),
      };

      const { resource } = await item.replace(updatedUser);
      resolve(resource);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/**
 * ユーザー更新
 *  - subscription開始 or 停止
 */
export const updateSubscription = async (
  clerkId: string,
  isSubscribed: boolean,
  subscriptionId?: string | null,
  subscriptionExpiresAt?: string | null
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cosmosClient = new CosmosClient(
        process.env.COSMOS_CONNECTION_STRING!
      );
      const database = cosmosClient.database(process.env.COSMOS_DATABASE_NAME!);
      const container = database.container(
        process.env.COSMOS_CONTAINER_NAME_USER!
      );

      // 更新対象のアイテムを取得
      const item = container.item(clerkId, clerkId);
      const { resource: existingUser } = await item.read();

      if (!existingUser) {
        // ユーザーが見つからなかった場合
        throw new Error(`User with id ${clerkId} not found.`);
      }

      // 更新フィールドをマージ
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      const expiresAtIso = subscriptionExpiresAt
        ? new Date(subscriptionExpiresAt).toISOString()
        : null;

      const updatedUser = {
        ...existingUser,
        isSubscribed,
        subscriptionId: isSubscribed
          ? subscriptionId ?? existingUser.subscriptionId ?? null
          : existingUser.subscriptionId ?? null,
        subscriptionPurchasedAt: isSubscribed
          ? existingUser.subscriptionPurchasedAt ?? now.toISOString()
          : null,
        subscriptionExpiresAt: isSubscribed
          ? expiresAtIso ?? expiresAt.toISOString()
          : existingUser.subscriptionExpiresAt ?? null,
        updatedAt: now.toISOString(),
      };

      // 置換 (replace) で更新を実施
      const { resource } = await item.replace(updatedUser);
      resolve(resource);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/**
 * サブスクリプション解約（自動更新停止）
 *  - 現在の期限は維持し、isSubscribed を false にする
 */
export const cancelSubscription = async (clerkId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cosmosClient = new CosmosClient(
        process.env.COSMOS_CONNECTION_STRING!
      );
      const database = cosmosClient.database(process.env.COSMOS_DATABASE_NAME!);
      const container = database.container(
        process.env.COSMOS_CONTAINER_NAME_USER!
      );

      const item = container.item(clerkId, clerkId);
      const { resource: existingUser } = await item.read();

      if (!existingUser) {
        throw new Error(`User with id ${clerkId} not found.`);
      }

      const now = new Date();

      // Stripeの自動更新を停止（サブスクリプションIDがある場合のみ）
      if (existingUser.subscriptionId) {
        try {
          await stripe.subscriptions.update(existingUser.subscriptionId, {
            cancel_at_period_end: true,
          });
        } catch (stripeError) {
          console.error('Stripe cancel error', stripeError);
        }
      }

      const updatedUser = {
        ...existingUser,
        isSubscribed: false,
        subscriptionCancelledAt: now.toISOString(),
        // 現在の期限は維持（null の場合は null のまま）
        subscriptionExpiresAt: existingUser.subscriptionExpiresAt ?? null,
        subscriptionId: existingUser.subscriptionId ?? null,
        updatedAt: now.toISOString(),
      };

      const { resource } = await item.replace(updatedUser);
      resolve(resource);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/**
 * ユーザー削除
 */
export const deleteUser = async (clerkId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cosmosClient = new CosmosClient(
        process.env.COSMOS_CONNECTION_STRING!
      );
      const database = cosmosClient.database(process.env.COSMOS_DATABASE_NAME!);
      const container = database.container(
        process.env.COSMOS_CONTAINER_NAME_USER!
      );

      // 削除対象のアイテムを取得
      const item = container.item(clerkId, clerkId);
      const { resource: existingUser } = await item.read();

      if (!existingUser) {
        // 削除対象のユーザーが見つからなかった場合
        throw new Error(`User with id ${clerkId} not found.`);
      }

      // 対象ドキュメントを削除
      await container.item(clerkId, clerkId).delete();

      resolve(true);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/**
 * ユーザー情報取得
 */
export const selectUser = async (clerkId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cosmosClient = new CosmosClient(
        process.env.COSMOS_CONNECTION_STRING!
      );
      const database = cosmosClient.database(process.env.COSMOS_DATABASE_NAME!);
      const container = database.container(
        process.env.COSMOS_CONTAINER_NAME_USER!
      );

      // 更新対象のアイテムを取得
      const item = container.item(clerkId, clerkId);
      const { resource: existingUser } = await item.read();

      if (!existingUser) {
        // ユーザーが見つからなかった場合
        throw new Error(`User with id ${clerkId} not found.`);
      }

      resolve(existingUser);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/**
 * ユーザーの総学習時間（秒）を取得
 */
export const getUserStudyTimeSeconds = async (clerkId: string) => {
  return new Promise<number>(async (resolve, reject) => {
    try {
      const cosmosClient = new CosmosClient(
        process.env.COSMOS_CONNECTION_STRING!
      );
      const database = cosmosClient.database(process.env.COSMOS_DATABASE_NAME!);
      const container = database.container(
        process.env.COSMOS_CONTAINER_NAME_USER!
      );

      const item = container.item(clerkId, clerkId);
      const { resource: existingUser } = await item.read<{
        totalStudySeconds?: number;
      }>();

      if (!existingUser) {
        throw new Error(`User with id ${clerkId} not found.`);
      }

      resolve(existingUser.totalStudySeconds ?? 0);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/**
 * ユーザーの総学習時間（秒）に加算
 */
export const addUserStudyTimeSeconds = async (
  clerkId: string,
  seconds: number
) => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const cosmosClient = new CosmosClient(
        process.env.COSMOS_CONNECTION_STRING!
      );
      const database = cosmosClient.database(process.env.COSMOS_DATABASE_NAME!);
      const container = database.container(
        process.env.COSMOS_CONTAINER_NAME_USER!
      );

      const item = container.item(clerkId, clerkId);
      const { resource: existingUser } = await item.read<{
        totalStudySeconds?: number;
      }>();

      if (!existingUser) {
        throw new Error(`User with id ${clerkId} not found.`);
      }

      const now = new Date().toISOString();
      const currentTotal = existingUser.totalStudySeconds ?? 0;

      const updatedUser = {
        ...existingUser,
        totalStudySeconds: currentTotal + Math.round(seconds),
        updatedAt: now,
      };

      const { resource } = await item.replace(updatedUser);
      resolve(resource);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

