import type { Problem } from '../../types/problem';

export const validParenthesesProblem: Problem = {
  id: '040-valid-parentheses',
  title: '有效的括号 (Valid Parentheses)',
  slug: 'valid-parentheses',
  difficulty: 'easy',
  tags: ['Algorithm', 'Stack', 'String'],
  category: 'Algorithm',
  description: `
## Description

Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Example

\`\`\`javascript
console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
\`\`\`
`,
  templateCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (map[char]) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (char !== map[top]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}`,
  testCases: [
    { input: ["()"], output: true },
    { input: ["()[]{}"], output: true },
    { input: ["(]"], output: false }
  ],
  hints: [
    "Use a stack.",
    "Push open brackets.",
    "Pop when you see a closed bracket and check match."
  ],
  createdAt: '2024-01-29'
};
