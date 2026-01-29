import type { Problem } from '../../types/problem';

export const reactRouterProblem: Problem = {
  id: '050-react-router-principle',
  title: 'React Router 原理 (React Router Principle)',
  slug: 'react-router-principle',
  difficulty: 'medium',
  tags: ['React', 'Router'],
  category: 'React',
  description: `
## Description

Implement a simplified **Hash Router**.
1. \`HashRouter\`: Monitors \`hashchange\` event.
2. \`Route\`: Renders component if the hash matches the path.
3. \`Link\`: Changes the window location hash.

## Example

\`\`\`javascript
<HashRouter>
  <Link to="/home">Home</Link>
  <Link to="/about">About</Link>
  
  <Route path="/home" component={Home} />
  <Route path="/about" component={About} />
</HashRouter>
\`\`\`
`,
  templateCode: `import React, { useState, useEffect, createContext, useContext } from 'react';

const RouterContext = createContext();

// 1. HashRouter Component
export function HashRouter({ children }) {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    // Listen to hashchange
    
  }, []);

  return (
    <RouterContext.Provider value={path}>
      {children}
    </RouterContext.Provider>
  );
}

// 2. Route Component
export function Route({ path, component: Component }) {
  // Render component only if current path matches
  
  return null;
}

// 3. Link Component
export function Link({ to, children }) {
  return (
    <a href={'#' + to} className="text-blue-500 underline mx-2">
      {children}
    </a>
  );
}

// Usage Example
const Home = () => <div className="p-4">Home Page</div>;
const About = () => <div className="p-4">About Page</div>;

export default function App() {
  return (
    <div className="p-4">
      <HashRouter>
        <nav className="mb-4 border-b pb-2">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </HashRouter>
    </div>
  );
}`,
  testCases: [],
  hints: [
    "In HashRouter, window.addEventListener('hashchange', ...).",
    "In Route, consume RouterContext and compare with prop path.",
    "Remember to clean up the event listener."
  ],
  createdAt: '2024-01-29'
};
