import type { Problem } from '../../types/problem';

export const reflowRepaintProblem: Problem = {
  id: '072-reflow-repaint',
  title: '重排 vs 重绘 (Reflow vs Repaint)',
  slug: 'reflow-repaint',
  difficulty: 'medium',
  tags: ['Browser', 'Performance'],
  category: 'Browser',
  description: `
## Description

**Reflow (Layout)**: Calculates position and size. Expensive.
**Repaint**: Updates visual appearance (color, visibility). Cheaper.

## Task
Identify which operations trigger Reflow and which trigger only Repaint.
1. Changing \`width\`.
2. Changing \`color\`.
3. Reading \`offsetWidth\`.
4. Changing \`transform\`.

`,
  templateCode: `function getOperationType(property) {
  const reflowProps = ['width', 'height', 'margin', 'padding', 'left', 'top', 'offsetWidth'];
  const repaintProps = ['color', 'background', 'visibility'];
  const compositeProps = ['transform', 'opacity'];

  // Return 'Reflow', 'Repaint', or 'Composite'
  
}`,
  testCases: [],
  hints: [
    "Layout changes -> Reflow.",
    "Visual only -> Repaint.",
    "GPU layers -> Composite."
  ],
  createdAt: '2024-01-29'
};
