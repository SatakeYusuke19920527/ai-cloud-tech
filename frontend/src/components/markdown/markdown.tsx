'use client';

import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from 'react';

import { cn } from '@/lib/utils';

type MarkdownProps = {
  content: string;
  className?: string;
};

type CodeProps = React.ComponentPropsWithoutRef<'code'> & {
  inline?: boolean;
};

const normalizeHeadings = (text: string) => {
  // Zenn 風の見出しを崩さず、全角スペースを含む見出し行を正規化
  return text.replace(/^(#{1,6})(?:[ \t]|\u3000)+/gm, '$1 ');
};

// 画像パスを解決する関数
const resolveImagePath = (src: string | undefined): string => {
  if (!src || typeof src !== 'string') {
    return '';
  }

  // 絶対URL（http/https）の場合はそのまま使用
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // / から始まるパスはそのまま使用（publicフォルダからの参照）
  // 既に /images/ で始まっている場合はそのまま返す
  if (src.startsWith('/')) {
    return src;
  }

  // 相対パス（./image/...）を /images/... に変換
  if (src.startsWith('./image/')) {
    return src.replace('./image/', '/images/');
  }

  // 相対パス（./images/...）は既に /images/ に変換済みとして扱う
  if (src.startsWith('./images/')) {
    return src.replace('./images/', '/images/');
  }

  // 相対パス（./）を /images/ に変換
  if (src.startsWith('./')) {
    return src.replace('./', '/images/');
  }

  // その他の相対パスは /images/ を前置（ただし既に /images/ で始まっていない場合のみ）
  if (!src.startsWith('/images/')) {
    return `/images/${src}`;
  }

  return src;
};

const markdownComponents: Components = {
  h1: (props) => (
    <h1
      className="mt-10 border-b border-border pb-3 text-3xl font-bold leading-tight tracking-tight text-foreground first:mt-0"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-8 border-b border-border/70 pb-2 text-2xl font-semibold leading-tight tracking-tight text-foreground first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight text-foreground first:mt-0" {...props} />
  ),
  
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
  img: ({ src, alt, ...props }) => {
    const imageSrc = typeof src === 'string' ? resolveImagePath(src) : '';
    
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt ?? ''}
        className="my-6 w-full rounded-lg border border-border bg-muted object-contain"
        loading="lazy"
        src={imageSrc}
        {...props}
      />
    );
  },
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  em: (props) => <em className="text-foreground" {...props} />,
};

export function Markdown({ content, className }: MarkdownProps) {
  const normalized = normalizeHeadings(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
      className={cn(
        'markdown-body text-[15px] leading-7 text-foreground [&>*+*]:mt-5 [&>*:first-child]:mt-0',
        className
      )}
    >
      {normalized}
    </ReactMarkdown>
  );
}
