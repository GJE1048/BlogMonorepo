import type { Problem } from '../../types/problem';

export const indexedDbProblem: Problem = {
  id: '075-indexed-db',
  title: 'IndexedDB',
  slug: 'indexed-db',
  difficulty: 'medium',
  tags: ['Browser', 'Database'],
  category: 'Browser',
  description: `
## Description

IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs.
It is asynchronous and transactional.

## Task
Open a database named 'MyDatabase', create an object store 'users', and add a user \`{ id: 1, name: 'Alice' }\`.
`,
  templateCode: `function initDB() {
  const request = indexedDB.open('MyDatabase', 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    // Create object store
    
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    // Add data transaction
    
  };
}`,
  testCases: [],
  hints: [
    "db.createObjectStore('users', { keyPath: 'id' })",
    "db.transaction(['users'], 'readwrite').objectStore('users').add(...)"
  ],
  createdAt: '2024-01-29'
};
