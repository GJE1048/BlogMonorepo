import type { Problem } from '../../types/problem';

export const reactLifecycleProblem: Problem = {
  id: '041-react-lifecycle',
  title: 'React 生命周期 (React Lifecycle)',
  slug: 'react-lifecycle',
  difficulty: 'medium',
  tags: ['React', 'Lifecycle'],
  category: 'React',
  description: `
## Description

Create a Class Component named \`LifecycleLogger\` that logs messages to the console during its lifecycle phases.

Requirements:
1. Log "constructor" when initialized.
2. Log "componentDidMount" after mounting.
3. Log "componentDidUpdate" after updating.
4. Log "componentWillUnmount" before unmounting.
5. Render a button that increments a counter state to trigger updates.

## Example

\`\`\`javascript
// Usage
<LifecycleLogger />
// Logs:
// "constructor"
// "componentDidMount"
// (Click button)
// "componentDidUpdate"
// (Unmount)
// "componentWillUnmount"
\`\`\`
`,
  templateCode: `import React from 'react';

export default class LifecycleLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('constructor');
  }

  // Implement other lifecycle methods here

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}`,
  testCases: [],
  hints: [
    "Use componentDidMount, componentDidUpdate, componentWillUnmount.",
    "Don't forget to call super(props) in constructor."
  ],
  createdAt: '2024-01-29'
};
