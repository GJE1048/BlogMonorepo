import { Problem } from '../../types/problem';

export const pathNormalizationProblem: Problem = {
  id: '119',
  title: 'Path Normalization',
  slug: 'path-normalization',
  difficulty: 'medium',
  category: 'Node.js',
  tags: ['Node.js', 'Path', 'Algorithm'],
  description: `
Implement a function \`normalizePath\` that resolves \`.\` and \`..\` segments in a file path, similar to \`path.normalize\`.

- \`//\` -> \`/\`
- \`./\` -> current directory (remove)
- \`../\` -> parent directory (go back)

The path should start with \`/\`.

Example:
\`normalizePath('/a/./b/../../c/')\` -> \`'/c'\`
  `,
  templateCode: `/**
 * @param {string} path
 * @return {string}
 */
function normalizePath(path) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {string} path
 * @return {string}
 */
function normalizePath(path) {
  const parts = path.split('/');
  const stack = [];
  
  for (const part of parts) {
    if (part === '' || part === '.') continue;
    if (part === '..') {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(part);
    }
  }
  
  return '/' + stack.join('/');
}`,
  testCases: [
    {
      input: ['/a/./b/../../c/'],
      output: '/c',
    },
    {
      input: ['/a//b////c/d//././/..'],
      output: '/a/b/c',
    },
  ],
  hints: [
    'Split the string by `/`.',
    'Use a stack to track directories.',
    'Pop from stack on `..`.',
  ],
  createdAt: '2024-01-29',
};
