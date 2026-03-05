import type { Problem } from '../../types/problem';

export const promiseAllProblem: Problem = {
  id: '007-promise-all',
  title: 'Promise.all 实现 (Promise.all Implementation)',
  slug: 'promise-all',
  difficulty: 'medium',
  tags: ['Promise', 'Async', 'JavaScript'],
  category: 'JavaScript',
  description: `
## Description

Implement \`Promise.all(iterable)\`.
It returns a single Promise that resolves to an array of the results of the input promises.
It rejects immediately if any of the input promises rejects.

## Example

\`\`\`javascript
const p1 = Promise.resolve(3);
const p2 = 42;
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

myPromiseAll([p1, p2, p3]).then(values => {
  console.log(values); // [3, 42, "foo"]
});
\`\`\`
`,
  templateCode: `/**
 * @param {Array} promises
 * @return {Promise}
 */
var myPromiseAll = function(promises) {
  
};`,
  solutionCode: `/**
 * @param {Array} promises
 * @return {Promise}
 */
var myPromiseAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }
    const results = [];
    let completed = 0;
    if (promises.length === 0) {
      resolve(results);
      return;
    }
    promises.forEach((p, index) => {
      Promise.resolve(p).then(value => {
        results[index] = value;
        completed++;
        if (completed === promises.length) {
          resolve(results);
        }
      }).catch(reject);
    });
  });
};`,
  testCases: [
    { input: [[1, 2, 3]], output: [1, 2, 3] } // Simplified
  ],
  hints: [
    "Return a new Promise.",
    "Iterate over the input array and count resolved promises.",
    "Use Promise.resolve() to handle non-promise values."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
