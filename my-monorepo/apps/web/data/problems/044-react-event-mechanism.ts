import type { Problem } from '../../types/problem';

export const reactEventProblem: Problem = {
  id: '044-react-event-mechanism',
  title: 'React 事件机制 (React Event Mechanism)',
  slug: 'react-event-mechanism',
  difficulty: 'medium',
  tags: ['React', 'Events'],
  category: 'React',
  description: `
## Description

Explain and demonstrate React's Synthetic Event system.
Create a component with a nested structure:
\`div (onClick) -> button (onClick)\`

Implement event handlers that:
1. Log the event phase (bubbling).
2. Stop propagation in the button handler and verify the div handler is not called.
3. Access the native event object from the Synthetic Event.

## Example

\`\`\`javascript
function EventDemo() {
  const handleDivClick = (e) => console.log('Div clicked');
  const handleBtnClick = (e) => {
    e.stopPropagation();
    console.log('Button clicked');
    console.log(e.nativeEvent);
  };

  return (
    <div onClick={handleDivClick}>
      <button onClick={handleBtnClick}>Click Me</button>
    </div>
  );
}
\`\`\`
`,
  templateCode: `import React from 'react';

export default function EventDemo() {
  const handleDivClick = (e) => {
    // Log div click
    console.log('Div clicked');
  };

  const handleBtnClick = (e) => {
    // Stop propagation and log button click
    
  };

  return (
    <div 
      onClick={handleDivClick} 
      className="p-10 bg-gray-200"
    >
      <button 
        onClick={handleBtnClick}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Click Me (Stop Propagation)
      </button>
    </div>
  );
}`,
  testCases: [],
  hints: [
    "e.stopPropagation() stops the event from bubbling up.",
    "e.nativeEvent gives access to the underlying browser event.",
    "React events are delegated to the root in React 17+."
  ],
  createdAt: '2024-01-29'
};
