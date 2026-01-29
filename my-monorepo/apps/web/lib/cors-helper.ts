import type { NextApiRequest, NextApiResponse } from 'next';
import { corsMiddleware } from '../src/middlewares/cors';

export function runCors(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
