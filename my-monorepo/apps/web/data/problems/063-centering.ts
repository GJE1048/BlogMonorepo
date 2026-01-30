import type { Problem } from '../../types/problem';

export const centeringProblem: Problem = {
  id: '063-centering',
  title: '垂直居中方案 (Vertical Centering)',
  slug: 'centering',
  difficulty: 'easy',
  tags: ['CSS', 'Layout'],
  category: 'CSS',
  description: `
## Description

Implement 3 different ways to center a child element inside a parent element (both horizontally and vertically).

1. Flexbox
2. Grid
3. Absolute Positioning + Transform

## HTML
\`\`\`html
<div class="parent">
  <div class="child">Center Me</div>
</div>
\`\`\`
`,
  templateCode: `/* Method 1: Flexbox */
.parent-flex {
  /* Your code here */
}

/* Method 2: Grid */
.parent-grid {
  /* Your code here */
}

/* Method 3: Absolute */
.parent-absolute {
  position: relative;
}
.child-absolute {
  /* Your code here */
}`,
  solutionCode: `/* Method 1: Flexbox */
.parent-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Method 2: Grid */
.parent-grid {
  display: grid;
  place-items: center;
}

/* Method 3: Absolute */
.parent-absolute {
  position: relative;
}
.child-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`,
  testCases: [],
  hints: [
    "Flex: justify-content: center; align-items: center;",
    "Grid: place-items: center;",
    "Absolute: top: 50%; left: 50%; transform: translate(-50%, -50%);"
  ],
  createdAt: '2024-01-29'
};
