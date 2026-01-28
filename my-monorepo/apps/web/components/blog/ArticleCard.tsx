import Link from 'next/link';
import { Code2 } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  isCodeArticle?: boolean;
  href: string;
}

export function ArticleCard({
  title,
  excerpt,
  date,
  readingTime,
  tags,
  isCodeArticle = false,
  href,
}: ArticleCardProps) {
  const isTech = isCodeArticle || tags.some(tag => ['typescript', 'react', 'next.js', 'node.js', 'rust', 'python'].includes(tag.toLowerCase()));
  
  // Simulated snippet count for now
  const snippetCount = isTech ? Math.floor(Math.random() * 5) + 1 : 0;

  return (
    <Link 
      href={href}
      className="group block rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5"
    >
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {isTech && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center">
              <Code2 size={12} className="mr-1" />
              技术
            </span>
          )}
          {tags.slice(0, 2).map((tag, i) => (
            <span 
              key={i} 
              className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-surface-2)] text-[var(--color-text)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className={`text-xl font-bold mb-3 line-clamp-2 transition-colors group-hover:text-[var(--color-accent)] text-[var(--color-text)] ${
          isTech ? 'font-mono tracking-tight' : ''
        }`}>
          {title}
        </h2>

        {/* Excerpt */}
        <p className="text-[var(--color-muted)] mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center text-sm text-[var(--color-muted)]">
          <time dateTime={date}>{date}</time>
          <span className="mx-2">•</span>
          <span>{readingTime}</span>
          
          {isTech && (
             <>
              <span className="mx-2">•</span>
              <span className="flex items-center text-[var(--color-accent)]">
                 <Code2 size={12} className="mr-1" />
                 {snippetCount} 个代码片段
              </span>
             </>
          )}
        </div>
      </div>
    </Link>
  );
}
