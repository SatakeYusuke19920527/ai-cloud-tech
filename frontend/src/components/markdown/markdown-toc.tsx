"use client";

import React, { useEffect, useState, useRef } from "react";
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
        .replace(/[^\w-]/g, "");

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
   ① 本文だけ表示
------------------------------ */
export function MarkdownBody({ content }: { content: string }) {
  return <BaseMarkdown content={content} className="prose" />;
}

/* ------------------------------
   ② 目次だけ表示（右側用）
------------------------------ */
export function TOC({
  content,
}: {
  content: string;
}) {
  const toc = useToc(content);
  const [activeId, setActiveId] = useState<string>("");

  const observer = useRef<IntersectionObserver | null>(null);

  // スクロール連動
  useEffect(() => {
    const elements = toc.map((item) => document.getElementById(item.id));
    if (!elements.length) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
    );

    elements.forEach((el) => el && observer.current?.observe(el));

    return () => observer.current?.disconnect();
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
    // <nav className="sticky top-28 w-full h-max p-4 bg-gray-50 rounded-md border border-gray-200">
    <nav className="sticky top-24 w-64 h-max p-4 bg-gray-50 rounded-md border border-gray-200">  
      <h2 className="font-semibold mb-2">目次</h2>
      <ul className="space-y-1">
        {toc.map((item) => (
          <li key={item.id} className={`pl-${(item.level - 1) * 4}`}>
            <a
              href={`#${item.id}`}
              onClick={handleClick(item.id)}
              className={`hover:underline ${
                activeId === item.id ? "text-black font-semibold" : "text-gray-800"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------
   ③ 従来どおり「左：本文 / 右：TOC」
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
