import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getChapterBySlug, chapters } from "@/lib/chapter-data";
import { MarkdownWithTOC } from "@/components/markdown/markdown-toc";
import { Separator } from "@/components/ui/separator";
import { MarkdownBody, TOC } from "@/components/markdown/markdown-toc";

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
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10 flex flex-col gap-8">
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

        {/* ---- ここから2カラム ---- */}
          <div className="relative flex w-full gap-8">

            {/* 本文ボックス */}
            <div className="flex-1">
              <section className="bg-card p-6 sm:p-8">
                <MarkdownBody content={chapter.content} />
              </section>
            </div>

            {/* 目次ボックス（右側固定） */}
             <aside className="hidden lg:block w-64 sticky top-[4rem] self-start h-[calc(100vh-4rem)] overflow-y-auto">
              <TOC content={chapter.content} />
            </aside>

          </div>

      </main>
    </div>
  );
}



export async function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}
