import type { Problem } from '../../types/problem';

export const lintingFormattingProblem: Problem = {
  id: '105-linting-formatting',
  title: 'Linting & Formatting',
  slug: 'linting-formatting',
  difficulty: 'easy',
  tags: ['Engineering', 'Tooling'],
  category: 'Engineering',
  description: `
## Description

Difference between Linting and Formatting:
- **Linting (ESLint)**: Catches bugs, enforces coding standards (no-unused-vars, eqeqeq).
- **Formatting (Prettier)**: Enforces code style (indentation, quotes, spacing).

## Task
Classify the rule as 'Linting' or 'Formatting'.
`,
  templateCode: `/**
 * @param {string} rule
 * @return {'Linting' | 'Formatting'}
 */
function classifyRule(rule) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Indentation/Quotes -> Formatting",
    "Unused vars/Logic -> Linting"
  ],
  createdAt: '2024-01-29'
};
