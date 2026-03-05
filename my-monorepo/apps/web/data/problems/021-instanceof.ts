import type { Problem } from '../../types/problem';

export const instanceofProblem: Problem = {
  id: '021-instanceof',
  title: '实现 instanceof (Implement instanceof)',
  slug: 'instanceof',
  difficulty: 'medium',
  tags: ['JavaScript', 'Prototype'],
  category: 'JavaScript',
  description: `
## Description

Implement a function \`myInstanceof\` that mimics the behavior of the \`instanceof\` operator.
The \`instanceof\` operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object.

## Example

\`\`\`javascript
class Car {}
const auto = new Car();

myInstanceof(auto, Car); // true
myInstanceof(auto, Object); // true
\`\`\`
`,
  templateCode: `/**
 * @param {object} left - The object to check
 * @param {function} right - The constructor
 * @return {boolean}
 */
function myInstanceof(left, right) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {object} left - The object to check
 * @param {function} right - The constructor
 * @return {boolean}
 */
function myInstanceof(left, right) {
  if (left === null || typeof left !== 'object') return false;
  let proto = Object.getPrototypeOf(left);
  while (proto) {
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}`,
  testCases: [
    { input: ['new Date()', 'Date'], output: true },
    { input: ['[]', 'Array'], output: true },
    { input: ['{}', 'Object'], output: true }
  ],
  hints: [
    "Use Object.getPrototypeOf() or __proto__ to traverse the prototype chain.",
    "Check if the prototype of the left object equals right.prototype."
  ],
  createdAt: '2024-01-29'
};
