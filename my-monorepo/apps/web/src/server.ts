import 'dotenv/config';
import express from 'express';
import { config } from './config';
import apiRouter from './routes';
import { corsMiddleware } from './middlewares/cors';
import { helmetMiddleware } from './middlewares/helmet';
import { errorHandler } from './middlewares/errorHandler';
import { isDbConfigured } from './db/neon';

const app = express();

const bootstrap = async () => {
  if (!isDbConfigured) {
    // eslint-disable-next-line no-console
    console.warn('DATABASE_URL is not configured. API may fail.');
  }
};

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', env: config.env });
});

app.use('/api', apiRouter);

app.use(errorHandler);

bootstrap()
  .then(() => {
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Blog API running on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start API server', error);
    process.exit(1);
  });
