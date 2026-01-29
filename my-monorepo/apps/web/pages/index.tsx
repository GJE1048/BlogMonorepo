import Head from 'next/head';
import { Layout } from '../components/Layout';
import { ArticleCard } from '../components/blog/ArticleCard';
import { fetchAuthor, fetchPosts } from '../lib/api';
import type { Author, PostSummary } from '../lib/types';

export default function Home({ posts, author }: { posts: PostSummary[]; author: Author }) {
  const heroSection = (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-accent)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <span className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] text-xs font-medium uppercase tracking-wider">
          精选专栏
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[var(--color-text)]">
          用结构化内容，<br className="hidden sm:block" />
          建立稳定而高质量的表达
        </h1>
        <p className="text-lg sm:text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed mb-10">
          这里收录关于内容策略、产品设计与 AI 协作的深度文章，让灵感可以长期被验证与复用。
        </p>

        <div className="flex justify-center gap-8 sm:gap-16 pt-8 border-t border-[var(--color-border)] max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-sm text-[var(--color-muted)] mb-1">每周更新</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">4 篇</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-[var(--color-muted)] mb-1">阅读人次</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">128k</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-[var(--color-muted)] mb-1">专题合集</div>
            <div className="text-2xl font-bold text-[var(--color-text)]">18 个</div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <Head>
        <title>知夏手记 · 博客</title>
        <meta name="description" content="设计、产品与 AI 的长期记录" />
      </Head>
      <Layout author={author} hero={heroSection}>
        {/* Bento Grid */}
        <section className="pb-20 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">最新文章</h2>
            <a href="/archives" className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
              查看全部 →
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="h-full"
              >
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
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: { query: { label?: string } }) {
  const label = context.query.label;
  try {
    const [posts, author] = await Promise.all([
      fetchPosts(label),
      fetchAuthor('1'),
    ]);
    return { props: { posts, author } };
  } catch (_err) {
    const fallbackAuthor: Author = {
      name: '知夏',
      title: '内容与产品',
      avatarUrl: '',
      bio: '结构化表达与长期复用。',
      stats: { posts: 0, followers: 0, readingHours: 0, weeklyCompletion: 0 },
      links: [],
    };
    return { props: { posts: [], author: fallbackAuthor } };
  }
}
