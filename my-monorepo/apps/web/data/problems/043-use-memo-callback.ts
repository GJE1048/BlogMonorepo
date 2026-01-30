import type { Problem } from '../../types/problem';

export const useMemoCallbackProblem: Problem = {
  id: '043-use-memo-callback',
  title: 'useMemo/useCallback 区别 (useMemo/useCallback)',
  slug: 'use-memo-callback',
  difficulty: 'easy',
  tags: ['React', 'Hooks', 'Performance'],
  category: 'React',
  description: `
## Description

Demonstrate the difference between \`useMemo\` and \`useCallback\`.
Create a component that uses both:
1. \`useMemo\` to cache a heavy calculation result.
2. \`useCallback\` to cache a function reference.

Render a parent component that passes props to a child component (memoized with React.memo) to show how stable references prevent re-renders.

## Example

\`\`\`javascript
const Child = React.memo(({ onClick, data }) => {
  console.log('Child Rendered');
  return <button onClick={onClick}>{data}</button>;
});

function Parent() {
  // Use useMemo and useCallback here
}
\`\`\`
`,
  templateCode: `import React, { useState, useMemo, useCallback } from 'react';

const Child = React.memo(({ onClick, value }) => {
  console.log('Child Rendered');
  return <button onClick={onClick} className="btn">Child: {value}</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 1. Create a memoized value 'expensiveValue' based on 'text'
  // 2. Create a memoized callback 'handleClick' that increments count

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Count: {count}</h1>
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        className="border p-2 mb-4 block"
        placeholder="Type here..." 
      />
      {/* Pass props to Child */}
      <Child />
    </div>
  );
}`,
  solutionCode: `import React, { useState, useMemo, useCallback } from 'react';

const Child = React.memo(({ onClick, value }) => {
  console.log('Child Rendered');
  return <button onClick={onClick} className="btn border p-2 bg-blue-100 rounded">Child: {value}</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 1. Create a memoized value 'expensiveValue' based on 'text'
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return text.toUpperCase();
  }, [text]);

  // 2. Create a memoized callback 'handleClick' that increments count
  // Note: If we want Child not to re-render when 'text' changes, 
  // handleClick should not depend on 'text'.
  // However, here we just want a stable function reference.
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty dependency array ensures stable reference

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Count: {count}</h1>
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        className="border p-2 mb-4 block w-full rounded"
        placeholder="Type here..." 
      />
      <p className="mb-4">Computed: {expensiveValue}</p>
      {/* Pass props to Child */}
      <Child onClick={handleClick} value={count} />
    </div>
  );
}`,
  testCases: [],
  hints: [
    "useMemo(() => compute(a, b), [a, b]) returns a value.",
    "useCallback(() => doSomething(a), [a]) returns a function.",
    "useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)."
  ],
  createdAt: '2024-01-29'
};
