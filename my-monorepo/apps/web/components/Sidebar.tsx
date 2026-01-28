import * as Avatar from '@radix-ui/react-avatar';
import * as Progress from '@radix-ui/react-progress';
import * as Separator from '@radix-ui/react-separator';
import type { Author } from '../lib/types';
import { cn } from '../lib/cn';

export function Sidebar({ author, className }: { author: Author; className?: string }) {
  return (
    <aside className={cn("h-fit sticky top-24", className)}>
      <div className="flex flex-col gap-6 p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl shadow-[var(--color-shadow)]">
        <div className="flex flex-col items-center text-center gap-4">
          <Avatar.Root className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[var(--color-surface-2)] shadow-md">
            <Avatar.Image
              className="w-full h-full object-cover"
              src={author.avatarUrl}
              alt={author.name}
            />
            <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-[var(--color-surface-2)] text-2xl font-bold text-[var(--color-muted)]">
              {author.name.slice(0, 1)}
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-[var(--color-text)]">{author.name}</h2>
            <p className="text-sm font-medium text-[var(--color-accent)]">{author.title}</p>
          </div>
        </div>
        
        <p className="text-sm leading-relaxed text-[var(--color-muted)] text-center">
          {author.bio}
        </p>

        <Separator.Root className="h-px bg-[var(--color-border)] w-full" />

        <div className="grid grid-cols-3 gap-2 py-2">
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-[var(--color-text)]">{author.stats.posts}</span>
            <span className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">文章</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-r border-[var(--color-border)]">
            <span className="text-lg font-bold text-[var(--color-text)]">{author.stats.followers.toLocaleString()}</span>
            <span className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">关注</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-[var(--color-text)]">{author.stats.readingHours}</span>
            <span className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">阅读</span>
          </div>
        </div>

        {/* Mini Trend Line Visualization */}
        <div className="h-8 w-full flex items-end gap-1 px-2 opacity-50">
          {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
             <div 
               key={i} 
               className="flex-1 bg-[var(--color-accent)] rounded-t-sm transition-all hover:opacity-100 hover:bg-[var(--color-accent)]"
               style={{ height: `${h}%`, opacity: 0.3 + (i * 0.1) }} 
             />
          ))}
        </div>

        <Separator.Root className="h-px bg-[var(--color-border)] w-full" />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-[var(--color-text)]">本周内容完成度</span>
            <span className="text-[var(--color-accent)]">{author.stats.weeklyCompletion ?? 0}%</span>
          </div>
          <Progress.Root 
            className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-2)]" 
            value={author.stats.weeklyCompletion ?? 0}
          >
            <Progress.Indicator 
              className="h-full w-full bg-[var(--color-accent)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" 
              style={{ transform: `translateX(-${100 - (author.stats.weeklyCompletion ?? 0)}%)` }} 
            />
          </Progress.Root>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {author.links.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
