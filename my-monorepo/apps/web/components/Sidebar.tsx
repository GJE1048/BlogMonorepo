import * as Avatar from '@radix-ui/react-avatar';
import * as Progress from '@radix-ui/react-progress';
import * as Separator from '@radix-ui/react-separator';
import type { Author } from '../lib/types';

export function Sidebar({ author }: { author: Author }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <Avatar.Root className="avatar-root">
          <Avatar.Image
            className="avatar-image"
            src={author.avatarUrl}
            alt={author.name}
          />
          <Avatar.Fallback className="avatar-fallback">
            {author.name.slice(0, 1)}
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="sidebar-title">
          <h2>{author.name}</h2>
          <p>{author.title}</p>
        </div>
        <p className="sidebar-bio">{author.bio}</p>
        <Separator.Root className="separator" />
        <div className="stats">
          <div>
            <span className="stat-value">{author.stats.posts}</span>
            <span className="stat-label">文章</span>
          </div>
          <div>
            <span className="stat-value">{author.stats.followers.toLocaleString()}</span>
            <span className="stat-label">关注</span>
          </div>
          <div>
            <span className="stat-value">{author.stats.readingHours}</span>
            <span className="stat-label">阅读</span>
          </div>
        </div>
        <Separator.Root className="separator" />
        <div className="progress-block">
          <div className="progress-label">
            <span>本周内容完成度</span>
            <span>{author.stats.weeklyCompletion ?? 0}%</span>
          </div>
          <Progress.Root className="progress-root" value={author.stats.weeklyCompletion ?? 0}>
            <Progress.Indicator 
              className="progress-indicator" 
              style={{ width: `${author.stats.weeklyCompletion ?? 0}%` }} 
            />
          </Progress.Root>
        </div>
        <div className="sidebar-links">
          {author.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
