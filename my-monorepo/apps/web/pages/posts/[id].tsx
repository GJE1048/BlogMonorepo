import Head from 'next/head';
import Link from 'next/link';
import * as Separator from '@radix-ui/react-separator';
import { Layout } from '../../components/Layout';
import { CommentSection } from '../../components/CommentSection';
import { fetchComments, fetchPostById } from '../../lib/api';
import type { Comment, PostDetail } from '../../lib/types';

export default function PostDetailPage({ post, comments }: { post: PostDetail; comments: Comment[] }) {
  const author = post.author;
  const paragraphs = post.content.split('\n\n');

  return (
    <>
      <Head>
        <title>{post.title} · 知夏手记</title>
      </Head>
      <Layout author={author}>
        <article className="post-detail">
          <Link className="back-link" href="/">
            ← 返回首页
          </Link>
          <div className="post-detail-cover" style={{ background: post.coverColor }} />
          <div className="post-detail-meta">
            <span>{post.publishedAt}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="post-detail-excerpt">{post.excerpt}</p>
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <Separator.Root className="separator" />
          <div className="post-detail-content">
            {paragraphs.map((paragraph, index) => (
              <p key={`${post.id}-p-${index}`}>{paragraph}</p>
            ))}
          </div>
        </article>
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
