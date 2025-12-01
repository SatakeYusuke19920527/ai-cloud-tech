"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { MCQRunner } from "@/components/assessment/mcq-runner";
import { resetDrillByChapter } from "@/features/drillSlice";
import type { DrillChapter } from "@/types/types";
import type { AppDispatch } from "@/store/store";

type Props = {
  chapter: DrillChapter;
  slug: string;
};

export default function DrillRunner({ chapter, slug }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resetDrillByChapter({ chapterSlug: slug }));
  }, [dispatch, slug]);

  return (
    <MCQRunner
      questions={chapter.questions}
      title={chapter.title}
      description={chapter.description}
      resultPath={`/dashboard/drill/${slug}/result`}
      trackChapterSlug={slug}
    />
  );
}
