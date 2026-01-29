import type { Problem } from '../../types/problem';

export const packageManagementProblem: Problem = {
  id: '103-package-management',
  title: 'Package Management',
  slug: 'package-management',
  difficulty: 'easy',
  tags: ['Engineering', 'Tooling'],
  category: 'Engineering',
  description: `
## Description

Compare package managers:
- **npm**: Standard, flat node_modules (hoisting).
- **yarn**: Faster, yarn.lock, PnP (Plug'n'Play).
- **pnpm**: Fast, disk space efficient (symlinks), strict dependency isolation.

## Task
Identify the package manager based on the feature.
`,
  templateCode: `/**
 * @param {string} feature
 * @return {'npm' | 'yarn' | 'pnpm'}
 */
function identifyPackageManager(feature) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Symlinks/Hardlinks -> pnpm",
    "Default/Standard -> npm",
    "PnP -> yarn"
  ],
  createdAt: '2024-01-29'
};
