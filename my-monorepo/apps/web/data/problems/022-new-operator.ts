import type { Problem } from '../../types/problem';

export const newOperatorProblem: Problem = {
  id: '022-new-operator',
  title: '实现 new 操作符 (Implement new operator)',
  slug: 'new-operator',
  difficulty: 'medium',
  tags: ['JavaScript', 'Constructor', 'Prototype'],
  category: 'JavaScript',
  description: `
## Description

Implement a function \`myNew\` that mimics the behavior of the \`new\` operator.

The \`new\` operator does the following:
1. Creates a blank, plain JavaScript object.
2. Links (sets the constructor of) this object to another object.
3. Passes the newly created object from Step 1 as the \`this\` context.
4. Returns \`this\` if the function doesn't return its own object.

## Example

\`\`\`javascript
function Person(name) {
  this.name = name;
}

const p = myNew(Person, 'John');
console.log(p.name); // 'John'
console.log(p instanceof Person); // true
\`\`\`
`,
  templateCode: `/**
 * @param {function} constructor
 * @param {...any} args
 * @return {object}
 */
function myNew(constructor, ...args) {
  // Your code here
  
}`,
  testCases: [
    { input: [], output: 'object' }
  ],
  hints: [
    "Create a new object inheriting from constructor.prototype.",
    "Call the constructor with 'this' bound to the new object.",
    "Return the result of the constructor if it's an object, otherwise return the new object."
  ],
  createdAt: '2024-01-29'
};
