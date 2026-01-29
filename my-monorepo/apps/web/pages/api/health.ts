import type { NextApiRequest, NextApiResponse } from 'next';
import { isDbConfigured, query } from '../../src/db/neon';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const result: any = {
    status: 'ok',
    dbConfigured: isDbConfigured,
    vercelUrl: process.env.VERCEL_URL || null,
    env: process.env.NODE_ENV,
  };

  if (isDbConfigured) {
    try {
      // Try a lightweight query
      await query('SELECT 1');
      result.dbQuery = 'success';
    } catch (err: any) {
      result.dbQuery = 'failed';
      result.error = err?.message || String(err);
    }
  } else {
    result.dbQuery = 'skipped';
  }

  res.json(result);
}
