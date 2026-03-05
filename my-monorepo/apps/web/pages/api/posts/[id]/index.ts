import type { NextApiRequest, NextApiResponse } from 'next';
import { query, isDbConfigured } from '../../../../src/db/neon';
import { runCors } from '../../../../lib/cors-helper';

const normalizeTags = (tags: unknown) => {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    }
  }
  return [];
};

const mapRowToPost = (row: any, commentCount = 0) => ({
  id: String(row.id),
  title: row.title,
  excerpt: row.excerpt,
  tags: normalizeTags(row.tags),
  publishedAt: row.published_at,
  readingTime: row.reading_time,
  coverColor: row.cover_color,
  viewCount: Number(row.view_count ?? 0),
  author: {
    name: row.author_name ?? 'Unknown',
    title: row.author_title ?? '',
    bio: row.author_bio ?? '',
    avatarUrl: row.author_avatar_url ?? undefined,
    stats: {
      posts: row.author_article_count ?? 0,
      followers: row.author_follower_count ?? 0,
      readingHours: row.author_total_reads ?? 0,
      weeklyCompletion: row.author_weekly_completion_rate ?? 0,
    },
    links: row.author_social_links || [],
  },
  commentCount,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runCors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string' || !/^\d+$/.test(id)) {
    console.warn(`[DB] GET /api/posts/${id} -> Invalid ID format`);
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    if (!isDbConfigured) {
      if (id === '20') {
        return res.json({
          id: '20',
          title: 'Egenerui：用声明式代码构建高效工具界面的新选择',
          excerpt: '用声明式代码构建高效工具界面的新选择。',
          tags: ['Frontend', 'UI', 'Tool', 'Egenerui'],
          publishedAt: new Date().toISOString().slice(0, 10),
          readingTime: '8 分钟阅读',
          coverColor: 'bg-pink-600',
          viewCount: 0,
          author: {
            name: 'GJE',
            title: '内容与产品',
            bio: '结构化表达与长期复用。',
            avatarUrl: '',
            stats: { posts: 0, followers: 0, readingHours: 0, weeklyCompletion: 0 },
            links: [{ label: 'GitHub', href: 'https://github.com/GJE1048/egenerui' }],
          },
          commentCount: 0,
          content:
            'Egenerui：用声明式代码构建高效工具界面的新选择\n\n更多信息：\n- 文档（Textbox）：https://gje1048.github.io/egenerui/components/input/textbox.html\n- npm 包：https://www.npmjs.com/package/egenerui\n- GitHub 仓库：https://github.com/GJE1048/egenerui\n',
        });
      }
      if (id === '21') {
        return res.json({
          id: '21',
          title: 'Co-Notion：下一代 AI 驱动的多人协同文档平台',
          excerpt: 'AI 驱动的多人协同文档平台，融合实时协作与智能辅助。',
          tags: ['Collaboration', 'AI', 'Realtime', 'Yjs'],
          publishedAt: new Date().toISOString().slice(0, 10),
          readingTime: '10 分钟阅读',
          coverColor: 'bg-cyan-600',
          viewCount: 0,
          author: {
            name: 'GJE',
            title: '内容与产品',
            bio: '结构化表达与长期复用。',
            avatarUrl: '',
            stats: { posts: 0, followers: 0, readingHours: 0, weeklyCompletion: 0 },
            links: [{ label: 'GitHub', href: 'https://github.com/GJE1048/co-notion' }],
          },
          commentCount: 0,
          content:
            'Co-Notion：下一代 AI 驱动的多人协同文档平台\n\nGitHub 仓库：https://github.com/GJE1048/co-notion\n',
        });
      }
    }
    console.log(`[DB] GET /api/posts/${id} -> querying single post and comment count`);
    await query('UPDATE posts SET view_count = COALESCE(view_count, 0) + 1 WHERE id = $1', [id]);
    const rows = await query<any>(`
      SELECT p.*, 
             a.name as author_name, a.title as author_title, a.bio as author_bio, 
             a.avatar_url as author_avatar_url,
             COALESCE(author_stats.author_article_count, a.article_count) as author_article_count,
             a.follower_count as author_follower_count,
             COALESCE(author_stats.author_total_reads, a.total_reads) as author_total_reads,
             a.weekly_completion_rate as author_weekly_completion_rate, a.social_links as author_social_links
      FROM posts p
      LEFT JOIN authors a ON p.author_id = a.id
      LEFT JOIN (
        SELECT author_id,
               COUNT(*)::int AS author_article_count,
               COALESCE(SUM(view_count), 0)::int AS author_total_reads
        FROM posts
        GROUP BY author_id
      ) author_stats ON author_stats.author_id = a.id
      WHERE p.id = $1 LIMIT 1
    `, [id]);
    
    const post = rows[0];
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    const commentCount = await query<{ count: number }>('SELECT COUNT(*)::int AS count FROM comments WHERE post_id = $1', [id]);
    
    return res.json({
      ...mapRowToPost(post, commentCount[0]?.count ?? 0),
      content: post.content,
    });
  } catch (error) {
    console.error(`[DB] GET /api/posts/${id} -> Error:`, error);
    return res.status(500).json({ message: 'Failed to load post' });
  }
}
