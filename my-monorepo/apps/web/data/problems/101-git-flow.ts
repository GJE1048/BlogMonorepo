import type { Problem } from '../../types/problem';

export const gitFlowProblem: Problem = {
  id: '101-git-flow',
  title: 'Git Flow',
  slug: 'git-flow',
  difficulty: 'easy',
  tags: ['Engineering', 'Git'],
  category: 'Engineering',
  description: `
## Description

Explain Git Flow concepts.
- **Master/Main**: Production ready code.
- **Develop**: Latest development changes.
- **Feature**: New features (branch off develop).
- **Release**: Prepare for production release (branch off develop).
- **Hotfix**: Fix production bug (branch off master).

## Task
Identify the correct branch type for a given scenario.
`,
  templateCode: `/**
 * @param {string} scenario
 * @return {'feature' | 'hotfix' | 'release' | 'develop'}
 */
function chooseBranch(scenario) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "New functionality -> feature",
    "Production bug -> hotfix",
    "Preparing v1.0 -> release"
  ],
  createdAt: '2024-01-29'
};
