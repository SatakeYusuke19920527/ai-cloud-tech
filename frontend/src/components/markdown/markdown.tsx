'use client';

import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from 'react';
import buri from '@/data/text/images/buri.png';
import chineseroom from '@/data/text/images/chinese_room.png';
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import { cn } from '@/lib/utils';

type MarkdownProps = {
  content: string;
  className?: string;
};

function remarkCustomDirective() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective"
      ) {
        node.data = node.data || {};
        node.data.hName = node.name; // ← message
      }
    });
  };
}

const localImages: Record<string, string> = {
  'buri.png': buri.src,
  'chinese_room.png': chineseroom.src,
};

type CodeProps = React.ComponentPropsWithoutRef<'code'> & {
  inline?: boolean;
};

const normalizeHeadings = (text: string) => {

  return text.replace(/^(#{1,6})(?:[ \t]|\u3000)+/gm, '$1 ');
};

/**
 * 太字記法 **text** の中に括弧が含まれている場合でも正しくパースされるように正規化
 * react-markdownのパーサーは、**で囲まれたテキストの中に括弧がある場合、
 * 正しくパースできないことがあるため、前処理で確実に検出できるようにする
 */
const normalizeBold = (text: string) => {
  // **で囲まれたテキストを検出（括弧を含む）
  // この正規表現は、**で始まり**で終わるパターンを探し、
  // その中に括弧、日本語、その他の文字が含まれていてもマッチする
  // 非貪欲マッチ（+?）を使用して、最短マッチを優先
  return text.replace(/\*\*([^*]+?)\*\*/g, (match, content) => {
    // 既に正しくフォーマットされている場合はそのまま返す
    // ただし、括弧が含まれている場合は確実に処理されるようにする
    return `**${content}**`;
  });
};

/**
 * Remarkプラグイン: パースされなかった太字記法を修正
 * テキストノード内に残っている **text** パターンを検出して strong ノードに変換
 */
function remarkFixBoldWithParentheses() {
  return (tree: any) => {
    const replacements: Array<{ parent: any; index: number; newNodes: any[] }> = [];
    
    // まず、置き換える必要があるノードを収集
    visit(tree, (node: any, index: number | undefined, parent: any) => {
      if (node.type !== 'text') return;
      if (!node.value || typeof node.value !== 'string') return;
      if (!parent || !parent.children || index === undefined) return;
      
      // テキストノード内に **text** パターンが残っているかチェック
      const boldPattern = /\*\*([^*]+?)\*\*/g;
      const matches = Array.from(node.value.matchAll(boldPattern)) as RegExpMatchArray[];
      
      if (matches.length === 0) return;
      
      // テキストノードを複数のノードに分割
      const newNodes: any[] = [];
      let lastIndex = 0;
      
      matches.forEach((match) => {
        const matchIndex = match.index ?? 0;
        // マッチ前のテキスト
        if (matchIndex > lastIndex) {
          const beforeText = node.value.slice(lastIndex, matchIndex);
          if (beforeText) {
            newNodes.push({
              type: 'text',
              value: beforeText,
            });
          }
        }
        
        // 太字ノードを作成
        newNodes.push({
          type: 'strong',
          children: [
            {
              type: 'text',
              value: match[1],
            },
          ],
        });
        
        lastIndex = matchIndex + match[0].length;
      });
      
      // 残りのテキスト
      if (lastIndex < node.value.length) {
        const remainingText = node.value.slice(lastIndex);
        if (remainingText) {
          newNodes.push({
            type: 'text',
            value: remainingText,
          });
        }
      }
      
      // 置き換え情報を保存
      if (newNodes.length > 0) {
        replacements.push({ parent, index, newNodes });
      }
    });
    
    // 収集した置き換えを実行（逆順で実行してインデックスがずれないようにする）
    replacements.reverse().forEach(({ parent, index, newNodes }) => {
      parent.children.splice(index, 1, ...newNodes);
    });
  };
}

const parseImageSize = (rawSrc: string) => {
  const sizePattern = /\s*=?(\d*)x(\d*)$/;
  const match = rawSrc.match(sizePattern);

  if (!match) {
    return { src: rawSrc.trim(), width: undefined, height: undefined };
  }

  const width = match[1] ? Number(match[1]) : undefined;
  const height = match[2] ? Number(match[2]) : undefined;

  const cleanSrc = rawSrc.replace(sizePattern, '').trim();

  return { src: cleanSrc, width, height };
};

const resolveImagePath = (src?: string): string => {
  if (!src) return '';

  // まず完全一致でチェック
  if (localImages[src]) {
    return localImages[src];
  }

  // /images/で始まるパスの場合、ファイル名を抽出してlocalImagesで検索
  if (src.startsWith('/images/')) {
    const filename = src.replace('/images/', '');
    if (localImages[filename]) {
      return localImages[filename];
    }
  }

  // httpで始まる外部URLの場合はそのまま返す
  if (src.startsWith('http')) return src;

  // その他のパスの場合も、ファイル名だけを抽出してlocalImagesで検索
  const filename = src.split('/').pop() || src;
  if (localImages[filename]) {
    return localImages[filename];
  }

  // 見つからない場合は元のパスを返す（相対パスやその他のパスの場合）
  return src;
};

const createIdFromChildren = (children: React.ReactNode) => {
  const text = String(children)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-ぁ-んァ-ン一-龠]/g, "");
  return text;
};

const markdownComponents: Components = {
    h1: ({ children, ...props }) => {
    const id = createIdFromChildren(children);
    return (
      <h1
        id={id}
        className="mt-10 border-b border-border pb-3 text-3xl font-bold leading-tight tracking-tight text-foreground first:mt-0"
        {...props}
      >
        {children}
      </h1>
    );
  },
    h2: ({ children, ...props }) => {
    const id = createIdFromChildren(children);
    return (
      <h2
        id={id}
        className="mt-8 border-b border-border/70 pb-2 text-2xl font-semibold leading-tight tracking-tight text-foreground first:mt-0" {...props}>
        {children}
      </h2>
    );
  },
    h3: ({ children, ...props }) => {
    const id = createIdFromChildren(children);
    return (
      <h3 id={id}
        className="mt-6 text-xl font-semibold leading-snug tracking-tight text-foreground first:mt-0"{...props}>
        {children}
      </h3>
    );
  },
  p: (props) => <p className="leading-7 text-foreground" {...props} />,

  a: ({ href, ...props }) => (
    <a
      className="font-semibold text-primary underline decoration-2 underline-offset-4 transition hover:decoration-4"
      href={href}
      rel="noopener noreferrer"
      target={href?.startsWith('http') ? '_blank' : undefined}
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 space-y-2 border-l-4 border-primary/40 bg-muted/60 px-4 py-3 text-base text-foreground/80"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-4 list-disc space-y-2 pl-6" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-2 pl-6" {...props} />
  ),
  li: (props) => <li className="leading-7 text-foreground marker:text-muted-foreground" {...props} />,
  hr: (props) => <hr className="my-8 border-border/80" {...props} />,
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => <th className="bg-muted/60 px-4 py-2 font-semibold text-foreground" {...props} />,
  td: (props) => (
    <td className="border-t border-border/70 px-4 py-2 align-top text-muted-foreground" {...props} />
  ),
  code: ({ inline, className, children, ...props }: CodeProps) => {
    if (inline) {
      return (
        <code
          className={cn(
            'rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground',
            className
          )}
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 text-sm shadow-sm">
        <code className={cn('block font-mono leading-relaxed text-foreground', className)} {...props}>
          {children}
        </code>
      </pre>
    );
  },
  // 画像表示させたいのならimagesに画像を追加し、localImagesに追加してください
  img: ({ src, alt, ...props }) => {
    let realSrc = "";
    let width: string | undefined = undefined;
    let height: string | undefined = undefined;
  
    if (typeof src === "string") {
      // サイズ指定パターンを抽出 例: "buri.png =250x150"
      const sizeMatch = src.match(/^(.*?)\s*=\s*(\d*)x(\d*)$/);
  
      if (sizeMatch) {
        const [, path, w, h] = sizeMatch;
        realSrc = resolveImagePath(path.trim());
  
        if (w) width = w + "px";
        if (h) height = h + "px";
      } else {
        realSrc = resolveImagePath(src);
      }
    }
  
    return (
      <img
        alt={alt ?? ""}
        className="my-6 rounded-lg border border-border bg-muted object-contain"
        loading="lazy"
        src={realSrc}
        style={{
          width: width,
          height: height,
        }}
        {...props}
      />
    );
  },
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  em: (props) => <em className="text-foreground" {...props} />,

};

const directiveComponents = {
  message: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 rounded-lg border border-blue-300 bg-blue-50 p-4 text-blue-900">
      {children}
    </div>
  ),

  warning: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-900">
      {children}
    </div>
  ),

  success: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 rounded-lg border border-green-300 bg-green-50 p-4 text-green-900">
      {children}
    </div>
  ),

  alert: ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-900">
    {children}
  </div>

  ),
};


export function Markdown({ content, className }: MarkdownProps) {
  const normalized = normalizeHeadings(content);
  const normalizedWithBold = normalizeBold(normalized);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkDirective, remarkCustomDirective, remarkFixBoldWithParentheses]}
      components={{ ...markdownComponents, ...directiveComponents }}
      className={cn(
        'markdown-body text-[15px] leading-7 text-foreground [&>*+*]:mt-5 [&>*:first-child]:mt-0',
        className
      )}
    >
      {normalizedWithBold}
    </ReactMarkdown>
  );
}
