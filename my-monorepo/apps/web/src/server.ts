import 'dotenv/config';
import express from 'express';
import { config } from './config';
import apiRouter from './routes';
import { corsMiddleware } from './middlewares/cors';
import { helmetMiddleware } from './middlewares/helmet';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', env: config.env });
});

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Blog API running on http://localhost:${config.port}`);
});
