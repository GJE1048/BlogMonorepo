import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../src/db/neon';
import { runCors } from '../../../lib/cors-helper';

const labelToTags = (label?: string): string[] => {
  if (!label) return [];
  if (label === '专栏') return [];
  if (label === '订阅') return [];
  if (label === '合作') return ['协作'];
  return [label];
};

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

  try {
    const { label } = req.query as { label?: string };
    const tagsFilter = labelToTags(label);
    console.log('[DB] GET /api/posts -> label:', label, 'tagsFilter:', tagsFilter);

    let rows: any[];
    const selectClause = `
      SELECT p.*, COUNT(c.id) AS comment_count,
             a.name as author_name, a.title as author_title, a.bio as author_bio, 
             a.avatar_url as author_avatar_url, a.article_count as author_article_count,
             a.follower_count as author_follower_count, a.total_reads as author_total_reads,
             a.weekly_completion_rate as author_weekly_completion_rate, a.social_links as author_social_links
      FROM posts p
      LEFT JOIN comments c ON c.post_id = p.id
      LEFT JOIN authors a ON p.author_id = a.id
    `;

    if (tagsFilter.length > 0) {
      rows = await query<any>(
        `
        ${selectClause}
        WHERE p.tags && $1::text[]
        GROUP BY p.id, a.id
        ORDER BY p.published_at DESC
        `,
        [tagsFilter]
      );
    } else {
      rows = await query<any>(
        `
        ${selectClause}
        GROUP BY p.id, a.id
        ORDER BY p.published_at DESC
        `
      );
    }
    const posts = rows.map((row: any) =>
      mapRowToPost(row, Number(row.comment_count || 0))
    );
    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to load posts' });
  }
}
