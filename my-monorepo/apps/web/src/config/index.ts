export const config = {
  env: process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'development',
  port: Number.parseInt(process.env.PORT || '4001', 10),
  apiBase: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api',
  databaseUrl: process.env.DATABASE_URL || '',
  neonKey: process.env.NEXT_PUBLIC_NEON_KEY || '',
};
