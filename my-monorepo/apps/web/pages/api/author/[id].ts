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
      `SELECT * FROM authors WHERE id = $1`,
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
        posts: author.article_count,
        followers: author.follower_count,
        readingHours: author.total_reads, 
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
