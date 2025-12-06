import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Markdown } from '@/components/markdown/markdown';
import { Separator } from '@/components/ui/separator';
import { getChapterBySlug, chapters } from '@/lib/chapter-data';

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);
  if (!chapter) {
    notFound();
  }

  return (
    <div className="w-full py-10 sm:py-12">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-2 sm:px-6 md:px-10">
        <div className="space-y-2">
          <Link
            href="/dashboard/get-started"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            章一覧に戻る
          </Link>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground">
            {chapter.title}
          </h1>
          <p className="text-sm text-muted-foreground">{chapter.summary}</p>
        </div>

        <Separator />

        <section className="bg-card p-6 sm:p-8">
          <article className="space-y-8">
            <Markdown content={chapter.content} className="text-[15px]" />
          </article>
        </section>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}
