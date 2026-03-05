import { Problem } from '../../types/problem';

export const tsGenericsProblem: Problem = {
  id: '112',
  title: 'TypeScript Generics',
  slug: 'ts-generics',
  difficulty: 'medium',
  category: 'TypeScript',
  tags: ['TypeScript', 'Generics'],
  description: `
Implement a generic function \`createPair\` that takes two arguments of potentially different types and returns an array (tuple) containing them.

The function signature should look like:
\`function createPair<T, U>(first: T, second: U): [T, U]\`

Example:
\`createPair<string, number>('hello', 42)\` -> \`['hello', 42]\`
  `,
  templateCode: `/**
 * @template T, U
 * @param {T} first
 * @param {U} second
 * @return {[T, U]}
 */
function createPair(first, second) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @template T, U
 * @param {T} first
 * @param {U} second
 * @return {[T, U]}
 */
function createPair(first, second) {
  return [first, second];
}`,
  testCases: [
    {
      input: ['hello', 42],
      output: ['hello', 42],
    },
    {
      input: [true, { a: 1 }],
      output: [true, { a: 1 }],
    },
  ],
  hints: [
    'Just return an array containing the two arguments.',
    'The focus is on the function signature in TypeScript.',
  ],
  createdAt: '2024-01-29',
};
