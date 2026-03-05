import type { Problem } from '../../types/problem';

export const serviceWorkerProblem: Problem = {
  id: '076-service-worker',
  title: 'Service Worker',
  slug: 'service-worker',
  difficulty: 'medium',
  tags: ['Browser', 'PWA'],
  category: 'Browser',
  description: `
## Description

Service Workers act as proxy servers that sit between web applications, the browser, and the network.
They enable offline experiences, background syncs, and push notifications.

## Task
Register a Service Worker and listen to the \`install\` event to cache assets.
`,
  templateCode: `// Main thread
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js content (simulate)
/*
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
      ]);
    })
  );
});
*/`,
  testCases: [],
  hints: [
    "Use caches.open() and cache.addAll()."
  ],
  createdAt: '2024-01-29'
};
