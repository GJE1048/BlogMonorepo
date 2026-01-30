import type { Problem } from '../../types/problem';

export const pubSubProblem: Problem = {
  id: '008-pub-sub',
  title: '发布订阅模式 (Pub/Sub Pattern)',
  slug: 'pub-sub',
  difficulty: 'medium',
  tags: ['Design Pattern', 'JavaScript'],
  category: 'JavaScript',
  description: `
## Description

Implement a generic Event Emitter (Pub/Sub) class.
It should support \`on(event, callback)\`, \`off(event, callback)\`, and \`emit(event, ...args)\` methods.

## Example

\`\`\`javascript
const emitter = new EventEmitter();
const callback = (data) => console.log(data);
emitter.on('event', callback);
emitter.emit('event', 'hello'); // 'hello'
emitter.off('event', callback);
emitter.emit('event', 'world'); // nothing happens
\`\`\`
`,
  templateCode: `class EventEmitter {
  constructor() {
    
  }

  on(event, callback) {
    
  }

  off(event, callback) {
    
  }

  emit(event, ...args) {
    
  }
}`,
  solutionCode: `class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(cb => cb(...args));
  }
}`,
  testCases: [
    { input: ['test'], output: 'test' } // Simplified
  ],
  hints: [
    "Use an object or Map to store listeners.",
    "Each event can have multiple listeners (an array of callbacks)."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
