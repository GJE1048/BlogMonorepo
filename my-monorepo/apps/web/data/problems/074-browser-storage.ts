import type { Problem } from '../../types/problem';

export const browserStorageProblem: Problem = {
  id: '074-browser-storage',
  title: '浏览器存储 (Browser Storage)',
  slug: 'browser-storage',
  difficulty: 'easy',
  tags: ['Browser', 'Storage'],
  category: 'Browser',
  description: `
## Description

Compare **Cookie**, **LocalStorage**, and **SessionStorage**.

| Feature | Cookie | LocalStorage | SessionStorage |
|---|---|---|---|
| Size | 4KB | 5MB | 5MB |
| Expiry | Manual | Forever | Tab close |
| Server | Sent with req | Local only | Local only |

## Task
Implement a wrapper for \`localStorage\` that supports expiry time.
`,
  templateCode: `const storage = {
  set(key, value, ttl) {
    const data = {
      value,
      expiry: Date.now() + ttl
    };
    localStorage.setItem(key, JSON.stringify(data));
  },
  
  get(key) {
    // Check expiry
    
  }
};`,
  testCases: [],
  hints: [
    "JSON.parse(localStorage.getItem(key))",
    "If Date.now() > expiry, removeItem and return null."
  ],
  createdAt: '2024-01-29'
};
