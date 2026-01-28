import { Pool } from 'pg';
import { config } from '../config';

const databaseUrl = config.databaseUrl;

export const isDbConfigured = Boolean(databaseUrl);

export const pool = isDbConfigured
  ? new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : null;

export async function query<T = unknown>(text: string, params?: unknown[]): Promise<T[]> {
  if (!pool) {
    throw new Error('DATABASE_URL is not configured');
  }
  const result = await pool.query(text, params);
  return result.rows as T[];
}
