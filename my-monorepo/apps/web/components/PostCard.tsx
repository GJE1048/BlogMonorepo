import Link from 'next/link';
import * as Separator from '@radix-ui/react-separator';
import { ArrowRight, Code2, FileText } from 'lucide-react';
import type { PostSummary } from '../lib/types';
import { cn } from '../lib/cn';

export function PostCard({ post }: { post: PostSummary }) {
  const isTechArticle = post.tags.some(tag => ['typescript', 'react', 'next.js', 'node.js', 'rust', 'python'].includes(tag.toLowerCase()));

  return (
    <article className="group relative flex flex-col gap-0 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-2xl hover:shadow-[var(--color-accent-soft)] hover:-translate-y-1">
      {/* Decorative colored line on top instead of full cover to save space/load time, or keep cover if available */}
      <div 
        className="h-2 w-full transition-all duration-500 group-hover:h-3" 
        style={{ background: post.coverColor || 'var(--color-surface-2)' }} 
      />
      
      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <span>{post.readingTime}</span>
          </div>
          {isTechArticle && (
            <div className="p-1.5 rounded-md bg-[var(--color-surface-2)] text-[var(--color-accent)] opacity-80" title="技术文章">
              <Code2 size={16} />
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold leading-tight text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
          <Link href={`/posts/${post.id}`} className="before:absolute before:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="text-base leading-relaxed text-[var(--color-muted)] line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mt-2 relative z-10">
          {post.tags.map((tag) => (
            <span 
              key={tag} 
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-default",
                isTechArticle && ['typescript', 'react', 'next.js', 'node.js', 'rust', 'python'].includes(tag.toLowerCase()) 
                  ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]" 
                  : "bg-[var(--color-surface-2)] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <Separator.Root className="h-px bg-[var(--color-border)] w-full mt-2 opacity-50" />

        <div className="flex items-center justify-between text-sm font-medium text-[var(--color-muted)]">
          <span className="group-hover:text-[var(--color-text)] transition-colors">
            {post.commentCount > 0 ? `${post.commentCount} 条评论` : '暂无评论'}
          </span>
          <span className="flex items-center gap-1 text-[var(--color-accent)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            阅读全文 <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}
