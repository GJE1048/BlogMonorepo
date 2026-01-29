import Head from 'next/head';
import { Layout } from '../components/Layout';
import { ArticleCard } from '../components/blog/ArticleCard';
import { fetchPosts, fetchTags } from '../lib/api';
import type { Author, PostSummary } from '../lib/types';
import { Sidebar } from '../components/Sidebar';
import { cn } from '../lib/cn';

type ArchivesProps = {
  posts: PostSummary[];
  tags: { id: number; name: string }[];
  author: Author;
  currentLabel?: string;
};

export default function Archives({ posts, tags, author, currentLabel }: ArchivesProps) {
  return (
    <>
      <Head>
        <title>文章归档</title>
        <meta name="description" content="全部文章归档" />
      </Head>
      <Layout
        author={author}
        hero={
          <section className="relative pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[var(--color-text)]">全部文章</h1>
              <span className="text-sm text-[var(--color-muted)]">共 {posts.length} 篇</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/archives"
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm border transition-colors",
                  !currentLabel
                    ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-accent)]/30"
                    : "bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-surface-2)]"
                )}
              >
                全部
              </a>
              {tags.map((t) => (
                <a
                  key={t.id}
                  href={`/archives?label=${encodeURIComponent(t.name)}`}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm border transition-colors",
                    currentLabel === t.name
                      ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-accent)]/30"
                      : "bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-surface-2)]"
                  )}
                >
                  {t.name}
                </a>
              ))}
            </div>
          </section>
        }
      >
        <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post.id} className="h-full">
                  <ArticleCard
                    title={post.title}
                    excerpt={post.excerpt}
                    date={new Date(post.publishedAt).toISOString().split('T')[0]}
                    readingTime={post.readingTime}
                    tags={post.tags}
                    href={`/posts/${post.id}`}
                    commentCount={post.commentCount}
                  />
                </div>
              ))}
              {posts.length === 0 && (
                <div className="col-span-full text-center text-[var(--color-muted)] py-16">
                  暂无文章
                </div>
              )}
            </div>
            <Sidebar author={author} />
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: { query: { label?: string } }) {
  const label = context.query.label;
  try {
    const [posts, author, tags] = await Promise.all([
      fetchPosts(label),
      // 复用首页作者 ID 为 1
      Promise.resolve<Author>({
        name: '知夏',
        title: '内容与产品',
        avatarUrl: '',
        bio: '结构化表达与长期复用。',
        stats: { posts: 0, followers: 0, readingHours: 0, weeklyCompletion: 0 },
        links: [],
      }),
      fetchTags(),
    ]);
    return { props: { posts, author, tags, currentLabel: label ?? null } };
  } catch (_err) {
    const fallbackAuthor: Author = {
      name: '知夏',
      title: '内容与产品',
      avatarUrl: '',
      bio: '结构化表达与长期复用。',
      stats: { posts: 0, followers: 0, readingHours: 0, weeklyCompletion: 0 },
      links: [],
    };
    return { props: { posts: [], author: fallbackAuthor, tags: [], currentLabel: label ?? null } };
  }
}
