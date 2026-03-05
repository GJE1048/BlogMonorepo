import type { Problem } from '../../types/problem';

export const callApplyBindProblem: Problem = {
  id: '010-call-apply-bind',
  title: '手写 call/apply/bind (Implement call/apply/bind)',
  slug: 'call-apply-bind',
  difficulty: 'medium',
  tags: ['this', 'Prototype', 'JavaScript'],
  category: 'JavaScript',
  description: `
## Description

Implement your own version of \`call\`, \`apply\`, and \`bind\` methods for Function.prototype.
Note: You can name them \`myCall\`, \`myApply\`, \`myBind\` and attach them to \`Function.prototype\`.
For this problem, just implement \`myCall\`.

## Example

\`\`\`javascript
function greet() {
  return 'Hello, ' + this.name;
}
const person = { name: 'Alice' };
greet.myCall(person); // 'Hello, Alice'
\`\`\`
`,
  templateCode: `/**
 * @param {any} context
 * @param {...any} args
 * @return {any}
 */
Function.prototype.myCall = function(context, ...args) {
  
};`,
  solutionCode: `/**
 * @param {any} context
 * @param {...any} args
 * @return {any}
 */
Function.prototype.myCall = function(context, ...args) {
  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};`,
  testCases: [
    { input: [{ name: 'Alice' }], output: 'Hello, Alice' }
  ],
  hints: [
    "Add a unique property to the context object pointing to the function (this).",
    "Invoke the function through that property to set 'this' correctly.",
    "Delete the property afterwards."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
