import { Problem } from '../../types/problem';

export const koaMiddlewareProblem: Problem = {
  id: '117',
  title: 'Koa Middleware Composition',
  slug: 'koa-middleware',
  difficulty: 'medium',
  category: 'Node.js',
  tags: ['Node.js', 'Koa', 'Middleware'],
  description: `
Implement a \`runMiddlewares\` function that takes an array of middleware functions and executes them in order (Onion model).
It should return the \`logs\` array from the context.

Each middleware has the signature \`(ctx, next) => Promise<void>\`.
Context is \`{ logs: [] }\`.

Example:
\`\`\`js
const mw1 = async (ctx, next) => {
  ctx.logs.push('1 start');
  await next();
  ctx.logs.push('1 end');
};
const mw2 = async (ctx, next) => {
  ctx.logs.push('2 start');
  await next(); // next is no-op if no more middleware
  ctx.logs.push('2 end');
};
// runMiddlewares([mw1, mw2]) -> ['1 start', '2 start', '2 end', '1 end']
\`\`\`
  `,
  templateCode: `/**
 * @param {Array<Function>} middlewares
 * @return {Promise<string[]>}
 */
async function runMiddlewares(middlewares) {
  const ctx = { logs: [] };
  
  // Your code here
  // Implement composition and execution
  
  return ctx.logs;
}`,
  solutionCode: `/**
 * @param {Array<Function>} middlewares
 * @return {Promise<string[]>}
 */
async function runMiddlewares(middlewares) {
  const ctx = { logs: [] };
  
  function dispatch(i) {
    let fn = middlewares[i];
    if (!fn) return Promise.resolve();
    return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
  }

  await dispatch(0);
  return ctx.logs;
}`,
  testCases: [
    {
      input: [
        [
          async (ctx, next) => { ctx.logs.push('1'); await next(); ctx.logs.push('4'); },
          async (ctx, next) => { ctx.logs.push('2'); await next(); ctx.logs.push('3'); }
        ]
      ],
      output: ['1', '2', '3', '4'],
    },
  ],
  hints: [
    'Define a `dispatch(i)` function.',
    'Pass `dispatch.bind(null, i + 1)` as `next` to the middleware.',
  ],
  createdAt: '2024-01-29',
};
