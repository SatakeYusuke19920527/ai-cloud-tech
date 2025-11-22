import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockExams } from '@/lib/mock-exam-data';

export const dynamicParams = false;

export default async function MockExamResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ score?: string; incorrect?: string }>;
}) {
  const { slug } = await params;
  const { score, incorrect } = await searchParams;
  const exam = mockExams.find((mock) => mock.slug === slug);
  if (!exam) {
    notFound();
  }

  const incorrectIndices = incorrect
    ? incorrect
        .split(',')
        .filter(Boolean)
        .map((idx) => Number(idx))
    : [];
  const incorrectDetails = incorrectIndices.map((idx) => {
    const question = exam.questions[idx];
    return {
      prompt: question?.prompt ?? `問題 ${idx + 1}`,
      answer: question?.choices[question?.answerIndex ?? 0] ?? '---',
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/mock-exams"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            演習模試一覧に戻る
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {exam.title} - 結果
          </h1>
          <p className="text-sm text-muted-foreground">{exam.description}</p>
        </div>
        {score && (
          <Badge variant="secondary" className="gap-1 text-base">
            <Trophy className="h-4 w-4" />
            得点率 {score}%
          </Badge>
        )}
      </div>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>間違えた問題</CardTitle>
          <CardDescription>解説メモ（モック）で復習しましょう</CardDescription>
        </CardHeader>
        <CardContent>
          {incorrectDetails.length === 0 ? (
            <p className="text-sm text-muted-foreground">全問正解でした。次の模試に挑戦しましょう！</p>
          ) : (
            <ul className="space-y-3">
              {incorrectDetails.map((item, idx) => (
                <li
                  key={`${item.prompt}-${idx}`}
                  className="rounded-xl border border-border/60 bg-muted/40 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-foreground">{item.prompt}</p>
                  <p className="text-xs text-muted-foreground">正答例: {item.answer}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  return mockExams.map((exam) => ({ slug: exam.slug }));
}
