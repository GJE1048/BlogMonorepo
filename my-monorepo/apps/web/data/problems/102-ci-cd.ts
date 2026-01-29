import type { Problem } from '../../types/problem';

export const ciCdProblem: Problem = {
  id: '102-ci-cd',
  title: 'CI/CD Principles',
  slug: 'ci-cd',
  difficulty: 'medium',
  tags: ['Engineering', 'CI/CD'],
  category: 'Engineering',
  description: `
## Description

Explain CI/CD:
- **CI (Continuous Integration)**: Automate testing/building on push.
- **CD (Continuous Delivery/Deployment)**: Automate release/deployment.

## Task
Order the typical CI/CD pipeline stages.
Stages: Build, Test, Lint, Deploy, Monitor.
`,
  templateCode: `/**
 * @return {string[]}
 */
function getPipelineOrder() {
  // Return stages in order
  return [];
}`,
  testCases: [],
  hints: [
    "Lint/Test first.",
    "Then Build.",
    "Then Deploy.",
    "Monitor after deploy."
  ],
  createdAt: '2024-01-29'
};
