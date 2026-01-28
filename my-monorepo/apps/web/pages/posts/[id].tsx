import Head from 'next/head';
import Link from 'next/link';
import * as Separator from '@radix-ui/react-separator';
import * as Avatar from '@radix-ui/react-avatar';
import { Layout } from '../../components/Layout';
import { CommentSection } from '../../components/CommentSection';
import { MarkdownRenderer } from '../../components/MarkdownRenderer';
import { fetchComments, fetchPostById } from '../../lib/api';
import type { Comment, PostDetail } from '../../lib/types';
import { cn } from '../../lib/cn';

export default function PostDetailPage({ post, comments }: { post: PostDetail; comments: Comment[] }) {
  const author = post.author;
  const isCodeArticle = post.tags.some(tag => ['typescript', 'react', 'next.js', 'node.js', 'rust', 'python'].includes(tag.toLowerCase()));

  return (
    <>
      <Head>
        <title>{post.title} · 知夏手记</title>
      </Head>
      <Layout author={author}>
        <article className={cn(
          "prose-container py-8 sm:py-12",
          isCodeArticle ? "code-article" : ""
        )}>
          {/* Mobile Author Header */}
          <div className="flex md:hidden items-center gap-3 mb-8 pb-8 border-b border-[var(--color-border)]">
            <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden border border-[var(--color-border)]">
              <Avatar.Image src={author.avatarUrl} className="w-full h-full object-cover" />
              <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-[var(--color-surface-2)] text-xs font-bold text-[var(--color-muted)]">
                {author.name.slice(0, 1)}
              </Avatar.Fallback>
            </Avatar.Root>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[var(--color-text)]">{author.name}</span>
              <span className="text-xs text-[var(--color-muted)]">{author.title}</span>
            </div>
          </div>

          <Link className="inline-flex items-center text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-accent)] mb-8 transition-colors group" href="/">
            <span className="inline-block transition-transform group-hover:-translate-x-1 mr-1">←</span>
            返回首页
          </Link>
          
          <div 
            className="relative h-48 sm:h-72 w-full rounded-2xl mb-10 shadow-2xl shadow-[var(--color-shadow)] overflow-hidden" 
          >
            <div 
              className="absolute inset-0 opacity-80"
              style={{ background: post.coverColor || 'var(--color-surface-2)' }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/50 to-transparent" />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-[var(--color-muted)] uppercase tracking-wider mb-6">
            <time dateTime={post.publishedAt} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              {post.publishedAt}
            </time>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <span>{post.readingTime}</span>
            {isCodeArticle && (
              <>
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                <span className="text-[var(--color-accent)]">技术专栏</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text)] mb-8 leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-xl leading-relaxed text-[var(--color-muted)] mb-10 font-medium border-l-4 border-[var(--color-accent)] pl-6 italic">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <span className="px-3 py-1.5 rounded-lg bg-[var(--color-surface-2)] text-sm font-medium text-[var(--color-text)] transition-all hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)] hover:-translate-y-0.5 cursor-default border border-transparent hover:border-[var(--color-accent-soft)]" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <Separator.Root className="h-px bg-[var(--color-border)] w-full mb-12" />

          <div className="mt-8">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>
        
        <Separator.Root className="h-px bg-[var(--color-border)] w-full max-w-3xl mx-auto mb-16" />
        
        <CommentSection postId={post.id} initialComments={comments} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: { params?: { id?: string } }) {
  const id = context.params?.id ?? '';
  const post = await fetchPostById(id);
  if (!post) {
    return { notFound: true };
  }
  const comments = await fetchComments(id);
  return {
    props: {
      post,
      comments,
    },
  };
}
