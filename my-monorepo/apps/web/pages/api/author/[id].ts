import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../src/db/neon';
import { runCors } from '../../../lib/cors-helper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runCors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;
  
  if (!id || typeof id !== 'string' || !/^\d+$/.test(id)) {
    return res.status(400).json({ message: 'Invalid author ID' });
  }

  try {
    const rows = await query<any>(
      `
      SELECT
        a.*,
        COALESCE(stats.post_count, 0) AS post_count,
        COALESCE(stats.total_reads, 0) AS total_reads
      FROM authors a
      LEFT JOIN (
        SELECT author_id,
               COUNT(*)::int AS post_count,
               COALESCE(SUM(view_count), 0)::int AS total_reads
        FROM posts
        GROUP BY author_id
      ) stats ON stats.author_id = a.id
      WHERE a.id = $1
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const author = rows[0];
    
    const response = {
      id: author.id,
      name: author.name,
      title: author.title,
      bio: author.bio,
      avatarUrl: author.avatar_url,
      stats: {
        posts: author.post_count ?? author.article_count ?? 0,
        followers: author.follower_count,
        readingHours: author.total_reads ?? 0, 
        weeklyCompletion: author.weekly_completion_rate,
      },
      links: author.social_links || [],
    };

    return res.json(response);
  } catch (error) {
    console.error('Error fetching author:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
