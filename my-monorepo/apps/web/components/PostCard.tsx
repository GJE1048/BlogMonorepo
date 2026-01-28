import Link from 'next/link';
import * as Separator from '@radix-ui/react-separator';
import type { PostSummary } from '../lib/types';

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="post-card">
      <div className="post-cover" style={{ background: post.coverColor }} />
      <div className="post-body">
        <div className="post-meta">
          <span>{post.publishedAt}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <Separator.Root className="separator" />
        <div className="post-footer">
          <span>评论 {post.commentCount}</span>
          <Link className="read-more" href={`/posts/${post.id}`}>
            阅读全文 →
          </Link>
        </div>
      </div>
    </article>
  );
}
