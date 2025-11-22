'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type MCQQuestion = {
  prompt: string;
  choices: [string, string, string, string];
  answerIndex: number;
};

export type MCQRunnerProps = {
  title?: string;
  description?: string;
  questions: MCQQuestion[];
  resultPath?: string;
};

export function MCQRunner({
  title,
  description,
  questions,
  resultPath,
}: MCQRunnerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
  };

  const handleComplete = (updated: Record<number, number>) => {
    if (!resultPath) return;
    const incorrect = Object.entries(updated)
      .map(([idx, value]) => ({ idx: Number(idx), value }))
      .filter(({ idx, value }) => questions[idx].answerIndex !== value)
      .map(({ idx }) => idx);
    const score = Math.round(
      ((questions.length - incorrect.length) / questions.length) * 100
    );
    const params = new URLSearchParams({ score: String(score) });
    if (incorrect.length) {
      params.set('incorrect', incorrect.join(','));
    }
    router.push(`${resultPath}?${params.toString()}`);
  };

  const handleNext = () => {
    if (selectedChoice === null) return;
    const updatedAnswers = { ...answers, [currentIndex]: selectedChoice };
    setAnswers(updatedAnswers);

    if (isLast) {
      handleComplete(updatedAnswers);
      return;
    }

    setSelectedChoice(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const buttonLabel = isLast
    ? selectedChoice !== null
      ? 'テスト完了'
      : '最後の問題です'
    : '次の問題へ';

  return (
    <Card className="border border-border bg-card">
      <CardHeader className="space-y-3">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            問題 {currentIndex + 1} / {questions.length}
          </span>
          <span>回答済み {Object.keys(answers).length}</span>
        </div>
        <Progress value={((currentIndex + 1) / questions.length) * 100} />
        <CardTitle className="text-xl">{question.prompt}</CardTitle>
        <CardDescription>
          {description ?? title ?? '選択肢を選んで次へ進んでください。'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {question.choices.map((choice, idx) => (
            <button
              key={choice}
              type="button"
              onClick={() => handleSelect(idx)}
              className={cn(
                'w-full rounded-xl border px-4 py-3 text-left text-sm transition',
                selectedChoice === idx
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-muted/50 hover:border-primary/40'
              )}
            >
              {choice}
            </button>
          ))}
        </div>
        <Button
          className="w-full"
          onClick={handleNext}
          disabled={selectedChoice === null}
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
