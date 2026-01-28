import Head from 'next/head';
import { Layout } from '../components/Layout';
import { PostCard } from '../components/PostCard';
import { fetchAuthor, fetchPosts } from '../lib/api';
import type { Author, PostSummary } from '../lib/types';

export default function Home({ posts, author }: { posts: PostSummary[]; author: Author }) {
  return (
    <>
      <Head>
        <title>知夏手记 · 博客</title>
        <meta name="description" content="设计、产品与 AI 的长期记录" />
      </Head>
      <Layout author={author}>
        <section className="hero">
          <div>
            <p className="hero-tag">精选专栏</p>
            <h1>用结构化内容，建立稳定而高质量的表达</h1>
            <p className="hero-sub">
              这里收录关于内容策略、产品设计与 AI 协作的深度文章，让灵感可以长期被验证与复用。
            </p>
          </div>
          <div className="hero-panel">
            <div className="hero-stat">
              <span>每周更新</span>
              <strong>4 篇</strong>
            </div>
            <div className="hero-stat">
              <span>阅读人次</span>
              <strong>128k</strong>
            </div>
            <div className="hero-stat">
              <span>专题合集</span>
              <strong>18 个</strong>
            </div>
          </div>
        </section>
        <section className="post-list">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: { query: { label?: string } }) {
  const label = context.query.label;
  const [posts, author] = await Promise.all([
    fetchPosts(label),
    fetchAuthor('1') // Fetch default author (ID 1)
  ]);
  
  return {
    props: {
      posts,
      author,
    },
  };
}
