import type { Problem } from '../../types/problem';

export const keepAliveProblem: Problem = {
  id: '059-keep-alive-principle',
  title: 'keep-alive 原理',
  slug: 'keep-alive-principle',
  difficulty: 'medium',
  tags: ['Vue', 'Cache'],
  category: 'Vue',
  description: `
## Description

Explain how \`<keep-alive>\` works.
Implement a basic LRU (Least Recently Used) cache algorithm which is often used in keep-alive.

## Example

\`\`\`javascript
const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
lru.get(1); // 1
lru.put(3, 3); // evicts key 2
\`\`\`
`,
  templateCode: `class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    // Your code here
    
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    // Your code here
    
  }
}`,
  solutionCode: `class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    const value = this.cache.get(key);
    // Refresh position
    this.cache.delete(key);
    this.cache.set(key, value);
    
    return value;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Delete the first item (oldest)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }
}`,
  testCases: [],
  hints: [
    "Map keeps insertion order.",
    "Re-inserting a key updates its position (makes it 'recent')."
  ],
  createdAt: '2024-01-29'
};
