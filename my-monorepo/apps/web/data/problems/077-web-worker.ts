import type { Problem } from '../../types/problem';

export const webWorkerProblem: Problem = {
  id: '077-web-worker',
  title: 'Web Worker',
  slug: 'web-worker',
  difficulty: 'easy',
  tags: ['Browser', 'Multithreading'],
  category: 'Browser',
  description: `
## Description

Web Workers allow you to run scripts in background threads.
They communicate with the main thread via \`postMessage\`.

## Task
Create a worker that calculates Fibonacci numbers to avoid blocking the UI.
`,
  templateCode: `// Main thread
const worker = new Worker('worker.js');
worker.postMessage(10);
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

// worker.js content
/*
self.onmessage = (e) => {
  const n = e.data;
  // Calculate fib
  const result = fib(n);
  self.postMessage(result);
};
*/`,
  testCases: [],
  hints: [
    "Workers don't have access to DOM.",
    "Data passed is copied, not shared."
  ],
  createdAt: '2024-01-29'
};
