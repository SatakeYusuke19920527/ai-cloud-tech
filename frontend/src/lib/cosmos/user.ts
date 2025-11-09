import { CosmosClient } from '@azure/cosmos';

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
