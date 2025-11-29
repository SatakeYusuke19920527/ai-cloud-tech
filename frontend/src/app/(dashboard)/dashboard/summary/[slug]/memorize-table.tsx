"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SummaryChapter } from "@/types/types";
import { cn } from "@/lib/utils";

type Props = {
  rows: SummaryChapter["keywords"];
};

export function MemorizeTable({ rows }: Props) {
  const initialState = useMemo(
    () => Object.fromEntries(rows.map((row) => [row.term, false])),
    [rows]
  );
  const [memorized, setMemorized] = useState<Record<string, boolean>>(initialState);
  const [revealed, setRevealed] = useState<Record<string, boolean>>(initialState);

  const toggle = (term: string) => {
    setMemorized((prev) => ({ ...prev, [term]: !prev[term] }));
  };

  const toggleReveal = (term: string) => {
    setRevealed((prev) => ({ ...prev, [term]: !prev[term] }));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">用語 (term)</TableHead>
          <TableHead>意味 (meaning)</TableHead>
          <TableHead className="w-[140px] text-right">暗記状態</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.term}
            data-state={memorized[row.term] ? "selected" : undefined}
            className="bg-card"
          >
            <TableCell className="font-semibold text-foreground">{row.term}</TableCell>
            <TableCell className="text-muted-foreground">
              <div className="flex min-h-[56px] items-center justify-between gap-3">
                <div className="flex-1">
                  {revealed[row.term] ? (
                    row.meaning
                  ) : (
                    <span className="flex w-full justify-start text-muted-foreground/70">
                      *****************
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="shrink-0"
                  onClick={() => toggleReveal(row.term)}
                >
                  {revealed[row.term] ? "隠す" : "表示"}
                </Button>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "gap-2",
                  memorized[row.term]
                    ? "border-emerald-200 bg-emerald-100 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                    : "border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                )}
                onClick={() => toggle(row.term)}
              >
                {memorized[row.term] ? (
                  <>
                    <Check className="h-4 w-4" />
                    覚えた
                  </>
                ) : (
                  <>
                    <RotateCcw className="h-4 w-4" />
                    確認する
                  </>
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption className="text-left">
        ボタンで「覚えた / 確認する」を切り替えて進捗を管理できます。
      </TableCaption>
    </Table>
  );
}
