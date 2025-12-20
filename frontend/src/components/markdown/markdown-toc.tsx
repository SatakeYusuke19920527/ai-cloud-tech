"use client";

import React, { useEffect, useState } from "react";
import { Markdown as BaseMarkdown } from "./markdown";

type TOCItem = { id: string; text: string; level: number };

/* ------------------------------
   共通：TOC（目次）生成フック
------------------------------ */
function useToc(content: string) {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    const headingRegex = /^(#{1,3})\s*(.+)$/gm;
    const matches = [...content.matchAll(headingRegex)];

    const slugCount: Record<string, number> = {};
    const tocData = matches.map((match) => {
      const rawText = match[2].trim();

      let slug = rawText
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-ぁ-んァ-ン一-龠]/g, "");

      if (!slug) slug = "section";

      if (slugCount[slug]) {
        slugCount[slug] += 1;
        slug = `${slug}-${slugCount[slug]}`;
      } else {
        slugCount[slug] = 1;
      }

      return {
        level: match[1].length,
        text: rawText,
        id: slug,
      };
    });

    setToc(tocData);
  }, [content]);

  return toc;
}

/* ------------------------------
   ① 本文
------------------------------ */
export function MarkdownBody({ content }: { content: string }) {
  return <BaseMarkdown content={content} className="prose" />;
}

/* ------------------------------
   ② Zenn風 目次（完成版）
------------------------------ */
export function TOC({ content }: { content: string }) {
  const toc = useToc(content);
  const [activeId, setActiveId] = useState("");

  // ✅ Zenn方式スクロール追従
  useEffect(() => {
    const onScroll = () => {
      let currentId = "";

      for (const item of toc) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // ★ Zennと同じ判定
        if (rect.top <= 120) {
          currentId = item.id;
        }
      }

      if (currentId) {
        setActiveId(currentId);
        history.replaceState(null, "", `#${currentId}`);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <nav className="w-64">
<p className="mb-3 text-sm font-medium text-foreground">
  目次
</p>
      <ul className="space-y-0.5 border-l border-gray-200 pl-3">
        {toc.map((item) => {
  const isMain = item.level <= 2; // # or ##
  const isActive = activeId === item.id;

  return (
    <li
      key={item.id}
      className="relative"
      style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
    >
      <a
        href={`#${item.id}`}
        onClick={handleClick(item.id)}
        className={`
          block py-1 text-sm transition-colors
          ${isMain ? "font-semibold" : "font-normal"}
          ${
            isActive
              ? "text-gray-900"
              : "text-gray-500 hover:text-gray-900"
          }
        `}
      >
        {item.text}

        {/* 左ライン（アクティブ時） */}
        {isActive && (
          <span className="absolute -left-3 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-sky-500 rounded" />
        )}
      </a>
    </li>
  );
})}

      </ul>
    </nav>
  );
}

/* ------------------------------
   ③ 左：本文 / 右：TOC
------------------------------ */
export function MarkdownWithTOC({ content }: { content: string }) {
  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <MarkdownBody content={content} />
      </div>

      <div className="hidden lg:block w-64">
        <TOC content={content} />
      </div>
    </div>
  );
}
