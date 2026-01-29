import { Problem } from '../../types/problem';

export const vitePrincipleProblem: Problem = {
  id: '107',
  title: 'Vite Import Rewrite',
  slug: 'vite-import-rewrite',
  difficulty: 'medium',
  category: 'Engineering',
  tags: ['Vite', 'ESM', 'Build Tools'],
  description: `
Vite serves source code as native ESM. However, bare module imports (e.g., \`import { useState } from "react"\`) are not supported by browsers. Vite rewrites these to absolute paths or relative paths to \`node_modules\`.

Your task is to implement a function \`rewriteImports\` that takes JavaScript source code and rewrites bare module imports to start with \`/@modules/\`.

Rules:
1. Imports starting with \`/\`, \`./\`, or \`../\` should be left unchanged.
2. Bare module imports (e.g., \`react\`, \`lodash\`) should be rewritten to \`/@modules/<module_name>\`.
3. Handle \`import ... from "..."\` syntax.

Example:
Input: \`import { useState } from "react"; import "./style.css";\`
Output: \`import { useState } from "/@modules/react"; import "./style.css";\`
  `,
  templateCode: `/**
 * @param {string} source
 * @return {string}
 */
function rewriteImports(source) {
  // Your code here
  
}`,
  testCases: [
    {
      input: [`import React from "react";`],
      output: `import React from "/@modules/react";`,
    },
    {
      input: [`import { a } from "./utils.js"; import b from 'lodash';`],
      output: `import { a } from "./utils.js"; import b from '/@modules/lodash';`,
    },
    {
      input: [`import "global-style";`],
      output: `import "/@modules/global-style";`,
    },
  ],
  hints: [
    'Use regular expressions to find import statements.',
    'The regex needs to capture the module specifier (the part inside quotes).',
    'Check if the specifier starts with ".", "/", or matches the bare module pattern.',
  ],
  createdAt: '2024-01-29',
};
