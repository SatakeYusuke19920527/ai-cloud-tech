import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getChapterBySlug, chapters } from "@/lib/chapter-data";
import { MarkdownWithTOC } from "@/components/markdown/markdown-toc";
import { Markdown } from '@/components/markdown/markdown';
import { Separator } from '@/components/ui/separator';

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
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 md:px-10">
        {/* 上部タイトル */}
        <div className="space-y-2">
          <Link
            href="/dashboard/get-started"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
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

        {/* 目次付き Markdown */}
        <section className="bg-card p-6 sm:p-8">
          <MarkdownWithTOC content={chapter.content} />
        </section>
      </main>
    </div>
  );
}

// ビルド時に全章ページ生成
export async function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}
