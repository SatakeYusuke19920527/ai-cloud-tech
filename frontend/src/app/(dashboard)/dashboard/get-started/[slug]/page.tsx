import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
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
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/get-started"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            章一覧に戻る
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{chapter.title}</h1>
          <p className="text-sm text-muted-foreground">{chapter.summary}</p>
        </div>
      </div>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>{chapter.title}</CardTitle>
          <CardDescription>章の全文</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[70vh] pr-4">
            <ReactMarkdown className="space-y-4 text-sm leading-relaxed [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_h1]:font-bold [&_h2]:font-semibold [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_hr]:my-4 [&_strong]:font-semibold">
              {chapter.content}
            </ReactMarkdown>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}
