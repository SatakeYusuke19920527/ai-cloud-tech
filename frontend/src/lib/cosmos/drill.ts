import { CosmosClient } from '@azure/cosmos';

const getContainer = () => {
  const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING!);
  const database = client.database(process.env.COSMOS_DATABASE_NAME!);
  return database.container(process.env.COSMOS_CONTAINER_NAME_DRILL!);
};

type DrillResultDoc = {
  id: string;
  userId: string;
  chapterSlug: string;
  score: number;
  correct: number;
  total: number;
  performedAt: string;
};

export async function saveDrillResult({
  userId,
  chapterSlug,
  score,
  correct,
  total,
}: Omit<DrillResultDoc, 'id' | 'performedAt'>) {
  const container = getContainer();
  const performedAt = new Date().toISOString();
  const id = `${userId}:${chapterSlug}:${performedAt}`;

  const doc: DrillResultDoc = {
    id,
    userId,
    chapterSlug,
    score,
    correct,
    total,
    performedAt,
  };

  const { resource } = await container.items.create(doc);
  return resource;
}

export async function getLatestDrillResultsByUser(userId: string) {
  const container = getContainer();
  const query = {
    query: 'SELECT c.chapterSlug, c.score, c.performedAt FROM c WHERE c.userId = @userId ORDER BY c.performedAt DESC',
    parameters: [{ name: '@userId', value: userId }],
  };

  const { resources } = await container.items.query<Pick<DrillResultDoc, 'chapterSlug' | 'score' | 'performedAt'>>(query).fetchAll();
  const latestByChapter: Record<string, { score: number; performedAt: string }> = {};

  for (const row of resources) {
    if (!latestByChapter[row.chapterSlug]) {
      latestByChapter[row.chapterSlug] = {
        score: row.score,
        performedAt: row.performedAt,
      };
    }
  }

  return latestByChapter;
}
