import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4001',
  'https://040619.xyz',
  /\.vercel\.app$/
];

export const corsMiddleware = cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
});
