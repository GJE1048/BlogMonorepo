import type { Problem } from '../../types/problem';

export const contextApiProblem: Problem = {
  id: '046-context-api',
  title: 'Context API',
  slug: 'context-api',
  difficulty: 'easy',
  tags: ['React', 'Context'],
  category: 'React',
  description: `
## Description

Use React Context API to manage a global theme (light/dark).
1. Create a \`ThemeContext\`.
2. Create a \`ThemeProvider\` component that holds the state.
3. Create a \`ThemedButton\` that consumes the context to change its style.
4. Add a toggle button to switch themes.

## Example

\`\`\`javascript
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}
\`\`\`
`,
  templateCode: `import React, { useState, useContext, createContext } from 'react';

// 1. Create Context
const ThemeContext = createContext();

// 2. Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create Consumer Component
function ThemedButton() {
  // Consume context here
  
  return (
    <button className="p-2 border rounded">
      I am a themed button
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="p-4">
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}`,
  solutionCode: `import React, { useState, useContext, createContext } from 'react';

// 1. Create Context
const ThemeContext = createContext();

// 2. Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create Consumer Component
function ThemedButton() {
  // Consume context here
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      className={\`p-2 border rounded \${
        theme === 'dark' 
          ? 'bg-gray-800 text-white border-gray-600' 
          : 'bg-white text-black border-gray-300'
      }\`}
      onClick={toggleTheme}
    >
      I am a \${theme} button (Click to toggle)
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="p-4">
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}`,
  testCases: [],
  hints: [
    "Use useContext(ThemeContext) to access the value.",
    "Pass both state and updater function in the context value object."
  ],
  createdAt: '2024-01-29'
};
