import type { Problem } from '../../types/problem';

export const fiberArchitectureProblem: Problem = {
  id: '045-fiber-architecture',
  title: 'Fiber 架构 (Fiber Architecture)',
  slug: 'fiber-architecture',
  difficulty: 'hard',
  tags: ['React', 'Architecture'],
  category: 'React',
  description: `
## Description

Simulate the core concept of React Fiber: **Time Slicing** (Work Loop).
Implement a \`workLoop\` function using \`requestIdleCallback\`.

Requirements:
1. Break a large task into smaller units of work.
2. If the browser is busy (deadline.timeRemaining() is low), yield control.
3. Resume work in the next idle callback.

## Example

\`\`\`javascript
let nextUnitOfWork = null;

function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);
\`\`\`
`,
  templateCode: `// Simulate a unit of work (e.g., rendering a fiber node)
function performUnitOfWork(work) {
  // Process current work
  console.log('Processing:', work);
  // Return next unit of work or null
  return work - 1 > 0 ? work - 1 : null;
}

let nextUnitOfWork = 100; // Start with 100 units

function workLoop(deadline) {
  // Implement the work loop using deadline.timeRemaining()
  
}

// Start the loop (uncomment to test in environment supporting requestIdleCallback)
// if (typeof requestIdleCallback !== 'undefined') {
//   requestIdleCallback(workLoop);
// }`,
  solutionCode: `// Simulate a unit of work (e.g., rendering a fiber node)
function performUnitOfWork(work) {
  // Process current work
  console.log('Processing:', work);
  // Return next unit of work or null
  return work - 1 > 0 ? work - 1 : null;
}

let nextUnitOfWork = 100; // Start with 100 units

function workLoop(deadline) {
  // Implement the work loop using deadline.timeRemaining()
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  } else {
    console.log('All work done!');
  }
}

// Start the loop (uncomment to test in environment supporting requestIdleCallback)
// if (typeof requestIdleCallback !== 'undefined') {
//   requestIdleCallback(workLoop);
// }`,
  testCases: [],
  hints: [
    "Use a while loop checking `nextUnitOfWork` and `deadline.timeRemaining() > 1`.",
    "Update `nextUnitOfWork` inside the loop.",
    "Schedule the next `workLoop` with `requestIdleCallback` if work remains."
  ],
  createdAt: '2024-01-29'
};
