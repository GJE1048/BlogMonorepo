import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../src/db/neon';
import { runCors } from '../../../../lib/cors-helper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runCors(req, res);

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  if (req.method === 'GET') {
    try {
      console.log(`[DB] GET /api/posts/${id}/comments -> querying comments`);
      const rows = await query<any>(
        'SELECT id, author, content, created_at FROM comments WHERE post_id = $1 ORDER BY created_at DESC',
        [id]
      );
      const comments = rows.map((row: any) => ({
        id: row.id,
        author: row.author,
        content: row.content,
        createdAt: row.created_at,
      }));
      return res.json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to load comments' });
    }
  } else if (req.method === 'POST') {
    const { author, content } = req.body as { author?: string; content?: string };

    if (!author || !content) {
      return res.status(400).json({ message: 'author and content are required' });
    }

    try {
      console.log(`[DB] POST /api/posts/${id}/comments -> inserting comment`);
      const rows = await query<{ id: number; author: string; content: string; created_at: string }>(
        'INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3) RETURNING id, author, content, created_at',
        [id, author, content]
      );
      const created = rows[0];
      return res.status(201).json({
        id: created.id,
        author: created.author,
        content: created.content,
        createdAt: created.created_at,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to create comment' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
