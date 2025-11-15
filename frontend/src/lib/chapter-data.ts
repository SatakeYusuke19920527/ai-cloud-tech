import fs from 'fs/promises';
import path from 'path';

export const chapters = [
  { slug: 'chapter-1', file: 'chapter-1.md' },
  { slug: 'chapter-2', file: 'chapter-2.md' },
  { slug: 'chapter-3', file: 'chapter-3.md' },
  { slug: 'chapter-4', file: 'chapter-4.md' },
  { slug: 'chapter-5', file: 'chapter-5.md' },
  { slug: 'chapter-6', file: 'chapter-6.md' },
  { slug: 'chapter-7', file: 'chapter-7.md' },
  { slug: 'chapter-8', file: 'chapter-8.md' },
  { slug: 'chapter-9', file: 'chapter-9.md' },
];

const textDir = path.join(process.cwd(), 'src', 'text');

export async function getChapterMeta(file: string) {
  const filePath = path.join(textDir, file);
  const content = await fs.readFile(filePath, 'utf8');
  const titleMatch = content.match(/^#\s*(.+)$/m);
  const summaryMatch = content.match(/##\s*(.+)$/m);
  return {
    title: titleMatch ? titleMatch[1] : file,
    summary: summaryMatch ? summaryMatch[1] : '概要準備中',
    content,
  };
}

export async function getAllChapters() {
  return Promise.all(
    chapters.map(async (chapter, index) => {
      const meta = await getChapterMeta(chapter.file);
      return { ...chapter, ...meta, order: index + 1 };
    })
  );
}

export async function getChapterBySlug(slug: string) {
  const entry = chapters.find((chapter) => chapter.slug === slug);
  if (!entry) return null;
  const meta = await getChapterMeta(entry.file);
  return { ...entry, ...meta };
}
