import type { Problem } from '../../types/problem';

export const arrayMethodsProblem: Problem = {
  id: '023-array-methods',
  title: '数组常用方法实现 (Implement Array Methods)',
  slug: 'array-methods',
  difficulty: 'easy',
  tags: ['JavaScript', 'Array', 'Polyfill'],
  category: 'JavaScript',
  description: `
## Description

Implement your own version of \`Array.prototype.map\`.
The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

## Example

\`\`\`javascript
const array1 = [1, 4, 9, 16];
const map1 = array1.myMap(x => x * 2);
console.log(map1); // [2, 8, 18, 32]
\`\`\`
`,
  templateCode: `Array.prototype.myMap = function(callback, thisArg) {
  // Your code here
  
};`,
  solutionCode: `Array.prototype.myMap = function(callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }
  return result;
};`,
  testCases: [
    { input: [], output: 'new-array' }
  ],
  hints: [
    "Iterate over 'this' (the array).",
    "Apply the callback to each element.",
    "Push the result to a new array and return it."
  ],
  createdAt: '2024-01-29'
};
