import type { Problem } from '../../types/problem';

export const reactPerformanceProblem: Problem = {
  id: '047-react-performance',
  title: 'React 性能优化 (React Performance)',
  slug: 'react-performance',
  difficulty: 'medium',
  tags: ['React', 'Performance'],
  category: 'React',
  description: `
## Description

Optimize the following component to prevent unnecessary re-renders.
Currently, \`Child\` re-renders every time the parent state changes, even if its props haven't changed.

Techniques to use:
1. \`React.memo\` for the child component.
2. \`useCallback\` for passing functions.
3. \`useMemo\` for expensive calculations (optional).

## Example

\`\`\`javascript
const Child = React.memo(({ onClick }) => {
  console.log('Child Render');
  return <button onClick={onClick}>Click</button>;
});
\`\`\`
`,
  templateCode: `import React, { useState } from 'react';

// Optimize this component
const Child = ({ onClick }) => {
  console.log('Child Rendered');
  return <button onClick={onClick} className="border p-2">Child Button</button>;
};

export default function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">Count: {count}</h1>
      <button 
        className="bg-blue-500 text-white p-2 mr-2"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)}
        className="border p-2 mx-2"
        placeholder="Type something..."
      />

      <div className="mt-4">
        <Child onClick={handleClick} />
      </div>
    </div>
  );
}`,
  solutionCode: `import React, { useState, useCallback } from 'react';

// Optimize this component
const Child = React.memo(({ onClick }) => {
  console.log('Child Rendered');
  return <button onClick={onClick} className="border p-2 bg-gray-100 hover:bg-gray-200 rounded">Child Button</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Empty dependency array means this function reference never changes

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl">Count: {count}</h1>
      <button 
        className="bg-blue-500 text-white p-2 mr-2 rounded"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)}
        className="border p-2 mx-2 rounded"
        placeholder="Type something..."
      />

      <div className="mt-4">
        <Child onClick={handleClick} />
      </div>
      
      <p className="mt-4 text-sm text-gray-500">
        Check console to see if Child re-renders when typing in input.
      </p>
    </div>
  );
}`,
  testCases: [],
  hints: [
    "Wrap Child with React.memo(Child).",
    "Wrap handleClick with useCallback(() => {}, [])."
  ],
  createdAt: '2024-01-29'
};
