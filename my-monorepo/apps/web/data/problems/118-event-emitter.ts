import { Problem } from '../../types/problem';

export const simpleEventEmitterProblem: Problem = {
  id: '118',
  title: 'Simple Event Emitter',
  slug: 'simple-event-emitter',
  difficulty: 'medium',
  category: 'Node.js',
  tags: ['Node.js', 'Events', 'Design Pattern'],
  description: `
Implement a function \`createEventEmitter\` that returns an object with \`on\`, \`emit\`, \`off\`, and \`once\` methods.

- \`on(event, listener)\`: Adds a listener.
- \`emit(event, arg)\`: Calls listeners with \`arg\`.
- \`off(event, listener)\`: Removes listener.
- \`once(event, listener)\`: Adds one-time listener.

The test runner will execute a sequence of operations and check the output.

Example usage in test:
\`\`\`js
const ee = createEventEmitter();
ee.on('click', (val) => console.log(val));
ee.emit('click', 'hello');
\`\`\`
  `,
  templateCode: `/**
 * @return {object}
 */
function createEventEmitter() {
  const events = {};
  
  return {
    on(event, listener) {
      // Your code here
    },
    emit(event, arg) {
      // Your code here
    },
    off(event, listener) {
      // Your code here
    },
    once(event, listener) {
      // Your code here
    }
  };
}`,
  solutionCode: `/**
 * @return {object}
 */
function createEventEmitter() {
  const events = {};
  
  return {
    on(event, listener) {
      if (!events[event]) events[event] = [];
      events[event].push(listener);
    },
    emit(event, arg) {
      if (events[event]) {
        events[event].forEach(fn => fn(arg));
      }
    },
    off(event, listener) {
      if (events[event]) {
        events[event] = events[event].filter(fn => fn !== listener && fn._original !== listener);
      }
    },
    once(event, listener) {
      const onceFn = (arg) => {
        this.off(event, onceFn);
        listener(arg);
      };
      onceFn._original = listener;
      this.on(event, onceFn);
    }
  };
}`,
  testCases: [
    {
      input: [], // Special handling needed or just a smoke test that returns "passed" if correct.
      output: 'passed' // Placeholder
    }
  ],
  hints: [
    'Use a closure to hold the `events` object.',
    'For `once`, attach the original listener to the wrapper to allow `off` to work before it fires.',
  ],
  createdAt: '2024-01-29',
};
