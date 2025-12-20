import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getChapterBySlug, chapters } from "@/lib/chapter-data";
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

<div className="w-full">
      <main className="mx-auto w-full max-w-6xl px-2 sm:px-4 md:px-5 flex flex-col gap-2">
        <div className="">
          <Link
            href="/dashboard/get-started"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className=" w-4" />
            章一覧に戻る
          </Link>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground">
            {/* {chapter.title} */}
          </h1>
          {/* <p className="text-sm text-muted-foreground">{chapter.summary}</p> */}
        </div>

        <Separator />

        {/* ---- ここから2カラム ---- */}
          <div className="relative flex w-full gap-4">

            {/* 本文ボックス */}
            <div className="flex-1">
              <section className="bg-card px-4 sm:p-6">
                <MarkdownBody content={chapter.content} />
              </section>
            </div>

            <aside className="hidden lg:block w-64 sticky top-[4rem] self-start">
              <div className="max-h-[calc(100vh-4rem)] overflow-y-auto my-10 pr-2">
                <TOC content={chapter.content} />
              </div>
            </aside>

          </div>

      </main>
    </div>
  );
}



export async function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}
