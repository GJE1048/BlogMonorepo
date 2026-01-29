import type { Problem } from '../../types/problem';

export const browserRenderingProblem: Problem = {
  id: '071-browser-rendering',
  title: '浏览器渲染流程 (Browser Rendering)',
  slug: 'browser-rendering',
  difficulty: 'hard',
  tags: ['Browser', 'Rendering'],
  category: 'Browser',
  description: `
## Description

Describe the Critical Rendering Path.
1. HTML -> DOM
2. CSS -> CSSOM
3. DOM + CSSOM -> Render Tree
4. Layout (Reflow)
5. Paint (Repaint)
6. Composite

## Task
Explain why \`<script>\` tags block rendering and how \`defer\` and \`async\` attributes help.

`,
  templateCode: `/**
 * @param {string} scriptType - 'normal', 'async', or 'defer'
 * @return {string} - Explanation of execution timing
 */
function explainScriptLoading(scriptType) {
  if (scriptType === 'async') {
    return 'Fetches in parallel, executes as soon as loaded (blocks parsing).';
  }
  // Complete the function
  
}`,
  testCases: [],
  hints: [
    "Normal: Blocks parsing until fetched and executed.",
    "Defer: Fetches in parallel, executes after parsing (before DOMContentLoaded)."
  ],
  createdAt: '2024-01-29'
};
