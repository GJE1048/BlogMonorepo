'use client';

import { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import sql from 'react-syntax-highlighter/dist/cjs/languages/prism/sql';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import rust from 'react-syntax-highlighter/dist/cjs/languages/prism/rust';
import go from 'react-syntax-highlighter/dist/cjs/languages/prism/go';
import diff from 'react-syntax-highlighter/dist/cjs/languages/prism/diff';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../../lib/cn';

// Register languages
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('diff', diff);

interface CodeBlockProps {
  code: string;
  language: string;
  fileName?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

export function CodeBlock({
  code,
  language,
  fileName,
  showLineNumbers = true,
  highlightLines = []
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const lineCount = code.split('\n').length;
  const shouldCollapse = lineCount > 20;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  return (
    <div className="group relative my-8 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[#1e1e1e] transition-all hover:shadow-lg">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-white/5">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            {fileName && (
              <span className="text-xs text-[var(--color-muted)] font-mono opacity-80 select-none">
                {fileName}
              </span>
            )}
         </div>
         <div className="flex items-center gap-2">
            <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg text-[var(--color-muted)] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Copy code"
            >
                {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
            <span className="text-xs font-medium text-[var(--color-muted)] font-mono uppercase tracking-wider">
              {language}
            </span>
         </div>
      </div>

      {/* Code Content */}
      <div className={cn("relative transition-all duration-300", shouldCollapse && !isExpanded ? "max-h-[320px] overflow-hidden" : "")}>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          lineProps={(lineNumber) => {
             const isHighlighted = highlightLines.includes(lineNumber);
             return {
                style: {
                    display: 'block',
                    backgroundColor: isHighlighted ? 'rgba(255, 255, 255, 0.1)' : undefined,
                    borderLeft: isHighlighted ? '3px solid var(--color-accent)' : undefined,
                    marginLeft: '-1.5rem',
                    paddingLeft: isHighlighted ? 'calc(1.5rem - 3px)' : '1.5rem',
                    paddingRight: '1.5rem',
                    width: 'calc(100% + 3rem)',
                }
             };
          }}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '14px',
            lineHeight: '1.6',
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          }}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#6e7681',
            textAlign: 'right',
          }}
        >
          {code}
        </SyntaxHighlighter>

        {shouldCollapse && !isExpanded && (
           <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1e1e1e] to-transparent flex items-end justify-center pb-4 z-10 pointer-events-none">
            <button 
              onClick={() => setIsExpanded(true)}
              className="pointer-events-auto px-4 py-1.5 rounded-full bg-[var(--color-accent)] text-white text-xs font-medium shadow-lg hover:bg-[var(--color-accent)]/90 transition-colors"
            >
              展开代码 ({lineCount} 行)
            </button>
          </div>
        )}
      </div>
      
       {shouldCollapse && isExpanded && (
        <div className="bg-[#2d2d2d] border-t border-white/5 py-2 flex justify-center">
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-xs text-[var(--color-muted)] hover:text-white transition-colors"
          >
            收起代码
          </button>
        </div>
      )}

      {/* Gradient Hover Effect */}
      <div 
        className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
