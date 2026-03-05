import { Problem } from '../../types/problem';

export const webpackPrincipleProblem: Problem = {
  id: '106',
  title: 'Webpack Loader Implementation',
  slug: 'webpack-loader',
  difficulty: 'hard',
  category: 'Engineering',
  tags: ['Webpack', 'Build Tools', 'Loader'],
  description: `
Implement a simple Webpack loader that replaces specific strings in the source code.

In Webpack, a loader is a function that takes the source of a file as input and returns the transformed source.
Your task is to implement a \`replaceLoader\` that accepts \`options\` with a \`replacements\` object, mapping original strings to new strings.

Example:
Input source: "Hello World"
Options: { replacements: { "World": "Webpack" } }
Output: "Hello Webpack"
  `,
  templateCode: `/**
 * @param {string} source
 * @param {object} options
 * @param {object} options.replacements - Key-value pairs for replacement
 * @return {string}
 */
function replaceLoader(source, options) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {string} source
 * @param {object} options
 * @param {object} options.replacements - Key-value pairs for replacement
 * @return {string}
 */
function replaceLoader(source, options) {
  let result = source;
  const replacements = options.replacements || {};
  for (const key in replacements) {
    // Replace all occurrences
    result = result.split(key).join(replacements[key]);
  }
  return result;
}`,
  testCases: [
    {
      input: ['Hello World', { replacements: { 'World': 'Webpack' } }],
      output: 'Hello Webpack',
    },
    {
      input: ['const a = 1; const b = 2;', { replacements: { 'const': 'var' } }],
      output: 'var a = 1; var b = 2;',
    },
    {
      input: ['No changes here', { replacements: { 'foo': 'bar' } }],
      output: 'No changes here',
    },
  ],
  hints: [
    'Use String.prototype.replace or regular expressions.',
    'Iterate over the keys of the replacements object.',
    'Remember that replace() with a string only replaces the first occurrence. Use replaceAll() or a global regex for multiple occurrences if needed (though the examples might only need simple replacement).',
  ],
  createdAt: '2024-01-29',
};
