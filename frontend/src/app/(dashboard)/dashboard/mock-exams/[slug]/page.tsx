import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ClipboardCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mockExams } from '@/lib/mock-exam-data';
import { MCQRunner } from '@/components/assessment/mcq-runner';

export const dynamicParams = false;

export default async function MockExamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = mockExams.find((mock) => mock.slug === slug);
  if (!exam) {
    notFound();
  }

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
            {exam.title}
          </h1>
          <p className="text-sm text-muted-foreground">{exam.description}</p>
        </div>
        {typeof exam.score === 'number' && (
          <Badge variant="secondary" className="gap-1 text-base">
            <ClipboardCheck className="h-4 w-4" />
            得点率 {exam.score}%
          </Badge>
        )}
      </div>

      <MCQRunner
        questions={exam.questions}
        title={exam.title}
        description={exam.description}
        resultPath={`/dashboard/mock-exams/${slug}/result`}
      />
    </div>
  );
}

export async function generateStaticParams() {
  return mockExams.map((exam) => ({ slug: exam.slug }));
}
