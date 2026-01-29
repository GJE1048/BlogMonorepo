import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../src/db/neon';
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
    console.log(`[DB] GET /api/posts/${id} -> querying single post and comment count`);
    const rows = await query<any>(`
      SELECT p.*, 
             a.name as author_name, a.title as author_title, a.bio as author_bio, 
             a.avatar_url as author_avatar_url, a.article_count as author_article_count,
             a.follower_count as author_follower_count, a.total_reads as author_total_reads,
             a.weekly_completion_rate as author_weekly_completion_rate, a.social_links as author_social_links
      FROM posts p
      LEFT JOIN authors a ON p.author_id = a.id
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
