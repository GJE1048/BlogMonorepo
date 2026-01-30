import type { Problem } from '../../types/problem';

export const react18FeaturesProblem: Problem = {
  id: '048-react-18-features',
  title: 'React 18 新特性 (React 18 Features)',
  slug: 'react-18-features',
  difficulty: 'medium',
  tags: ['React', 'Concurrent'],
  category: 'React',
  description: `
## Description

Demonstrate the usage of \`useTransition\` hook (Concurrent Mode) in React 18.
Create an input that updates a "slow" list.
Use \`useTransition\` to keep the input responsive while the list is filtering/updating.

## Example

\`\`\`javascript
const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  const value = e.target.value;
  setInput(value); // Urgent update
  startTransition(() => {
    setList(generateList(value)); // Non-urgent update
  });
};
\`\`\`
`,
  templateCode: `import React, { useState, useTransition } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    // Use startTransition to prioritize input update
    // Simulate heavy calculation
    const l = [];
    for (let i = 0; i < 2000; i++) {
      l.push(value + ' ' + i);
    }
    setList(l);
  };

  return (
    <div className="p-4">
      <input 
        value={input} 
        onChange={handleChange} 
        className="border p-2 w-full mb-4"
        placeholder="Type to filter..." 
      />
      {isPending && <p className="text-gray-500">Loading...</p>}
      <ul className="h-60 overflow-auto border p-2">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`,
  solutionCode: `import React, { useState, useTransition } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    // Urgent update: Update input field immediately
    setInput(value);
    
    // Non-urgent update: Update the list inside startTransition
    startTransition(() => {
      // Simulate heavy calculation
      const l = [];
      for (let i = 0; i < 5000; i++) {
        if (!value || (value + ' ' + i).includes(value)) {
           l.push(value + ' Item ' + i);
        }
      }
      setList(l);
    });
  };

  return (
    <div className="p-4">
      <input 
        value={input} 
        onChange={handleChange} 
        className="border p-2 w-full mb-4 rounded"
        placeholder="Type to filter (try typing fast)..." 
      />
      {isPending && <p className="text-blue-500 mb-2">Updating list...</p>}
      <ul className="h-60 overflow-auto border p-2 rounded bg-gray-50">
        {list.length === 0 && <li className="text-gray-400">List is empty</li>}
        {list.map((item, index) => (
          <li key={index} className="border-b last:border-0 py-1">{item}</li>
        ))}
      </ul>
    </div>
  );
}`,
  testCases: [],
  hints: [
    "Import useTransition from 'react'.",
    "Wrap the state update for the heavy list inside startTransition(() => { ... })."
  ],
  createdAt: '2024-01-29'
};
