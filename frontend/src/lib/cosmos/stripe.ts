// lib/cosmos.ts
import { CosmosClient } from '@azure/cosmos';

const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION_STRING!);

const database = client.database('your-db-name');
const userContainer = database.container('users');

type UserSubscriptionUpdate = {
  clerkId: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  isBillingActive: boolean;
  currentPeriodEnd?: Date | null;
};

export async function upsertUserSubscription(update: UserSubscriptionUpdate) {
  // clerkId でユーザー1レコードを持っている想定
  const { resources } = await userContainer.items
    .query({
      query: 'SELECT * FROM c WHERE c.clerkId = @clerkId',
      parameters: [{ name: '@clerkId', value: update.clerkId }],
    })
    .fetchAll();

  const existing = resources[0];

  const doc = {
    ...existing,
    clerkId: update.clerkId,
    stripeCustomerId:
      update.stripeCustomerId ?? existing?.stripeCustomerId ?? null,
    stripeSubscriptionId:
      update.stripeSubscriptionId ?? existing?.stripeSubscriptionId ?? null,
    isSubscribed: update.isBillingActive,
    subscriptionPurchasedAt:
      existing?.subscriptionPurchasedAt ?? new Date().toISOString(),
    subscriptionExpiresAt: update.currentPeriodEnd
      ? update.currentPeriodEnd.toISOString()
      : existing?.subscriptionExpiresAt ?? null,
  };

  const { resource } = await userContainer.items.upsert(doc);
  return resource;
}
