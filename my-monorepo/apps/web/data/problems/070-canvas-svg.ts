import type { Problem } from '../../types/problem';

export const canvasSvgProblem: Problem = {
  id: '070-canvas-svg',
  title: 'Canvas vs SVG',
  slug: 'canvas-svg',
  difficulty: 'medium',
  tags: ['HTML', 'Graphics'],
  category: 'HTML',
  description: `
## Description

**Canvas**: Raster graphics, pixel-based, good for games/complex animations.
**SVG**: Vector graphics, DOM-based, good for logos/charts.

## Task
1. Draw a red rectangle (50x50) using Canvas API.
2. Draw a blue circle (r=25) using SVG.

`,
  templateCode: `// Canvas
function drawCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  // Draw red rect at (0,0)
  
}

// SVG Code (String)
const svgCode = \`
<svg width="100" height="100">
  <!-- Draw blue circle -->
</svg>
\`;`,
  testCases: [],
  hints: [
    "ctx.fillStyle = 'red'; ctx.fillRect(0, 0, 50, 50);",
    "<circle cx='50' cy='50' r='25' fill='blue' />"
  ],
  createdAt: '2024-01-29'
};
