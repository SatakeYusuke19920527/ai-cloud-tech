'use client';

import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from 'react';
import buri from '@/data/text/images/buri.png';
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
};

type CodeProps = React.ComponentPropsWithoutRef<'code'> & {
  inline?: boolean;
};

const normalizeHeadings = (text: string) => {

  return text.replace(/^(#{1,6})(?:[ \t]|\u3000)+/gm, '$1 ');
};

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

  if (localImages[src]) {
    return localImages[src];
  }

  if (src.startsWith('http') || src.startsWith('/')) return src;

  return src;
};

const createIdFromChildren = (children: React.ReactNode) => {
  const text = String(children)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
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

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkDirective, remarkCustomDirective]}
      components={{ ...markdownComponents, ...directiveComponents }}
      className={cn(
        'markdown-body text-[15px] leading-7 text-foreground [&>*+*]:mt-5 [&>*:first-child]:mt-0',
        className
      )}
    >
      {normalized}
    </ReactMarkdown>
  );
}
