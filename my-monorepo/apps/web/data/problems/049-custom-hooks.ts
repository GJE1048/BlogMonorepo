import type { Problem } from '../../types/problem';

export const customHooksProblem: Problem = {
  id: '049-custom-hooks',
  title: '自定义 Hooks (Custom Hooks)',
  slug: 'custom-hooks',
  difficulty: 'medium',
  tags: ['React', 'Hooks'],
  category: 'React',
  description: `
## Description

Create a custom hook named \`useWindowSize\` that tracks the browser window dimensions.
It should return an object \`{ width, height }\` and update when the window is resized.

## Example

\`\`\`javascript
function App() {
  const { width, height } = useWindowSize();
  return <p>Window size: {width} x {height}</p>;
}
\`\`\`
`,
  templateCode: `import React, { useState, useEffect } from 'react';

// Implement the custom hook
function useWindowSize() {
  // Your code here
  return { width: 0, height: 0 };
}

export default function App() {
  const { width, height } = useWindowSize();

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl">Window Size</h2>
      <p className="text-xl mt-4 font-mono">
        {width} x {height}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Resize the browser window to see updates.
      </p>
    </div>
  );
}`,
  testCases: [],
  hints: [
    "Use useState to store width and height.",
    "Use useEffect to add 'resize' event listener.",
    "Don't forget to remove the event listener in the cleanup function."
  ],
  createdAt: '2024-01-29'
};
