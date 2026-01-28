import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './blog/CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg max-w-none 
      prose-headings:font-bold prose-headings:text-[var(--color-text)] 
      prose-p:text-[var(--color-text)] prose-p:leading-relaxed
      prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline
      prose-strong:text-[var(--color-text)] prose-strong:font-bold
      prose-ul:list-disc prose-ul:pl-6 prose-ul:text-[var(--color-muted)]
      prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-[var(--color-muted)]
      prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-accent)] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[var(--color-muted)]
      prose-img:rounded-xl prose-img:shadow-lg
      prose-hr:border-[var(--color-border)]
      prose-code:text-[var(--color-accent)] prose-code:bg-[var(--color-surface-2)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            // Parse filename from meta string (e.g. ```typescript title="src/api.ts")
            // react-markdown passes meta string in node.data.meta
            const meta = node?.data?.meta as string | undefined;
            const filenameMatch = meta ? /title="([^"]+)"/.exec(meta) : null;
            const filename = filenameMatch ? filenameMatch[1] : undefined;

            // Parse highlighted lines from meta string (e.g. {1,3-5})
            const highlightMatch = meta ? /{([\d,-]+)}/.exec(meta) : null;
            const highlightLines = highlightMatch ? parseRange(highlightMatch[1]) : [];

            if (!inline && match) {
              return (
                <CodeBlock 
                  language={language} 
                  code={codeString} 
                  fileName={filename}
                  highlightLines={highlightLines}
                />
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function parseRange(rangeStr: string): number[] {
  const lines = new Set<number>();
  rangeStr.split(',').forEach(part => {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          lines.add(i);
        }
      }
    } else {
      const num = Number(part);
      if (!isNaN(num)) {
        lines.add(num);
      }
    }
  });
  return Array.from(lines);
}
