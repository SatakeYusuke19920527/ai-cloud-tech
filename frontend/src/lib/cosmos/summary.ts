import { CosmosClient } from '@azure/cosmos';

const getContainer = () => {
  const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING!);
  const database = client.database(process.env.COSMOS_DATABASE_NAME!);
  return database.container(process.env.COSMOS_CONTAINER_NAME_SUMMARY!);
};

const buildId = (userId: string, chapterSlug: string, term: string) =>
  `${userId}:${chapterSlug}:${term}`;

/**
 * 指定ユーザー・章の暗記状態を取得
 */
export async function getSummaryMemorizedMap(userId: string, chapterSlug: string) {
  const container = getContainer();
  const query = {
    query: 'SELECT c.term, c.isMemorized FROM c WHERE c.userId = @userId AND c.chapterSlug = @chapterSlug',
    parameters: [
      { name: '@userId', value: userId },
      { name: '@chapterSlug', value: chapterSlug },
    ],
  };

  const { resources } = await container.items.query<{ term: string; isMemorized: boolean }>(query).fetchAll();
  return resources.reduce<Record<string, boolean>>((acc, curr) => {
    acc[curr.term] = Boolean(curr.isMemorized);
    return acc;
  }, {});
}

/**
 * 用語の暗記状態を保存（upsert）
 */
export async function upsertSummaryMemorizedState(
  userId: string,
  chapterSlug: string,
  term: string,
  isMemorized: boolean
) {
  const container = getContainer();
  const id = buildId(userId, chapterSlug, term);

  const doc = {
    id,
    userId,
    chapterSlug,
    term,
    isMemorized,
    updatedAt: new Date().toISOString(),
  };

  const { resource } = await container.items.upsert(doc);
  return resource;
}
