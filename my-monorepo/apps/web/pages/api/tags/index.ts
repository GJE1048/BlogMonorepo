import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../src/db/neon';
import { runCors } from '../../../lib/cors-helper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runCors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const rows = await query<any>(
      `SELECT * FROM tags ORDER BY name ASC`
    );
    return res.json(rows);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
