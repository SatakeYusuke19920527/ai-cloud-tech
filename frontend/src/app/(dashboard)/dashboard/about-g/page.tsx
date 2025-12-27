import fs from 'fs/promises';
import path from 'path';

import { Markdown } from '@/components/markdown/markdown';

async function loadIntro() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'about-g', 'intro.md');
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error('Failed to read about-g intro markdown', error);
    return '# G検定とは\n\nコンテンツの読み込みに失敗しました。時間を置いて再度お試しください。';
  }
}

export default async function AboutG() {
  const content = await loadIntro();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">G検定とは</h1>
        <p className="text-sm text-muted-foreground">
          JDLA が主催する「G検定（ジェネラリスト検定）」の概要や最新情報をまとめています。
        </p>
      </div>

      <article className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
        <Markdown content={content} />
      </article>
    </div>
  );
}
