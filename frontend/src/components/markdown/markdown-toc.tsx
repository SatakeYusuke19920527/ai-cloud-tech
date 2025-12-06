"use client";

import React, { useEffect, useState, useRef } from "react";
import { Markdown as BaseMarkdown } from "./markdown";

type TOCItem = { id: string; text: string; level: number };

export function MarkdownWithTOC({ content }: { content: string }) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  const observer = useRef<IntersectionObserver | null>(null);

  // 目次生成
  // useEffect(() => {
  //   const headingRegex = /^(#{1,3})\s*(.+)$/gm;
  //   const matches = [...content.matchAll(headingRegex)];

  //   const tocData = matches.map((match) => ({
  //     level: match[1].length,
  //     text: match[2].trim(),
  //     id: match[2]
  //       .trim()
  //       .toLowerCase()
  //       .replace(/\s+/g, "-")
  //       .replace(/[^\w-]/g, ""),
  //   }));

  //   setToc(tocData);
  // }, [content]);

  // 目次生成
useEffect(() => {
  const headingRegex = /^(#{1,3})\s*(.+)$/gm;
  const matches = [...content.matchAll(headingRegex)];

  const slugCount: Record<string, number> = {};
  
  const tocData = matches.map((match) => {
    const rawText = match[2].trim();

    // スラッグ生成
    let slug = rawText
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    // 空スラッグの場合 "section" とする
    if (!slug) slug = "section";

    // 重複を避けるため連番を付ける
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


  // スクロール連動（Zenn風）
  useEffect(() => {
    const elements = toc.map((item) => document.getElementById(item.id));
    if (!elements.length) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            history.replaceState(null, "", `#${entry.target.id}`); // URL更新
          }
        });
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => el && observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [toc]);


  

  // ✨ 追加：クリックでスムーススクロール
  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`); // URLに反映
      setActiveId(id);
    }
  };

  return (
    <div className="flex gap-8">
      {/* TOC */}
      <nav className="sticky top-20 w-64 h-max p-4 bg-gray-50 rounded-md border border-gray-200">
        <h2 className="font-semibold mb-2">目次</h2>
        <ul className="space-y-1">
          {toc.map((item) => (
            <li key={item.id} className={`pl-${(item.level - 1) * 4}`}>
              <a
                href={`#${item.id}`}
                onClick={handleClick(item.id)}
                className={`hover:underline ${
                  activeId === item.id
                    ? "text-blue-700 font-semibold"
                    : "text-blue-600"
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Markdown本文 */}
      <div className="flex-1">
        <BaseMarkdown content={content} className="prose" />
      </div>
    </div>
  );
}
