"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { ArrowLeft, Target } from "lucide-react";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/nextjs";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { selectDrillByChapter } from "@/features/drillSlice";
import { Button } from "@/components/ui/button";
import { drillChapters } from "@/lib/drill-data";
import { cn } from "@/lib/utils";

export default function DrillResultPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;
  const results = useSelector(selectDrillByChapter(slug));
  const { userId, isLoaded } = useAuth();
  const postedRef = useRef(false);

  const chapter = drillChapters.find((c) => c.slug === slug);

  useEffect(() => {
    if (!chapter) {
      router.replace("/dashboard/drill");
    }
  }, [chapter, router]);

  const summary = useMemo(() => {
    if (!results.length) {
      return { score: null, correct: 0, total: 0 };
    }
    const total = results.length;
    const correct = results.filter((r) => r.correct).length;
    const score = Math.round((correct / total) * 100);
    return { score, correct, total };
  }, [results]);

  useEffect(() => {
    if (
      postedRef.current ||
      !isLoaded ||
      !userId ||
      !chapter ||
      summary.score === null ||
      results.length === 0
    )
      return;

    postedRef.current = true;

    const sendResult = async () => {
      try {
        await fetch("/api/drill/result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chapterSlug: slug,
            score: summary.score,
            correct: summary.correct,
            total: summary.total,
          }),
        });
      } catch (error) {
        console.error("Failed to save drill result", error);
        postedRef.current = false;
      }
    };
    sendResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, userId, slug, summary.score, summary.correct, summary.total, chapter, results.length]);

  if (!chapter) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/drill"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            ドリル一覧へ戻る
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {chapter.title} - 結果
          </h1>
        </div>
        {summary.score !== null && (
          <div className="flex flex-col items-end gap-2 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-primary shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
              <Target className="h-4 w-4" />
              Score
            </div>
            <p className="text-4xl font-bold leading-tight">
              {summary.score}%
            </p>
            <p className="text-xs text-primary/80">
              {summary.correct}/{summary.total} 正解
            </p>
          </div>
        )}
      </div>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>回答一覧</CardTitle>
          <CardDescription>
            それぞれの問題と解説、正解/不正解の結果を確認できます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>回答データが見つかりませんでした。最初からドリルをやり直してください。</p>
              <Button asChild size="sm">
                <Link href={`/dashboard/drill/${slug}`}>ドリルに戻る</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {results
                .slice()
                .sort((a, b) => a.questionIndex - b.questionIndex)
                .map((entry) => (
                  <div
                    key={`${entry.chapterSlug}-${entry.questionIndex}`}
                    className="rounded-2xl border border-border/70 bg-muted/40 p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          問題 {entry.questionIndex + 1}
                        </p>
                        <p className="text-sm font-semibold text-foreground">{entry.prompt}</p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                          entry.correct
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-destructive/10 text-destructive"
                        )}
                      >
                        {entry.correct ? "正解" : "不正解"}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2 text-sm">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          あなたの回答
                        </p>
                        <p className="text-foreground">
                          {entry.choices[entry.selectedIndex] ?? "未回答"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          正答
                        </p>
                        <p className="text-foreground">{entry.choices[entry.answerIndex] ?? "---"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          解説
                        </p>
                        <p className="text-muted-foreground">
                          {entry.explanation ?? "解説は準備中です"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
