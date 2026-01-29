
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { NavBar } from '../components/NavBar';
import { Button } from '../components/ui/Button';
import { Play, RotateCcw, Check, ChevronDown } from 'lucide-react';
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackPreview, 
  SandpackConsole,
  SandpackFileExplorer,
  SandpackCodeEditor,
  type SandpackFiles
} from '@codesandbox/sandpack-react';
import { cn } from '../lib/cn';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditorPanel = dynamic(
  () => import('../components/code/MonacoEditorPanel'),
  { ssr: false }
);

const DEFAULT_REACT_CODE = `import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  // 防抖示例
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Count updated:', count);
    }, 500);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui' }}>
      <h1>Hello Code Sandbox</h1>
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(c => c + 1)}
        style={{
          padding: '8px 16px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        Increment
      </button>
    </div>
  );
}`;

const DEFAULT_VANILLA_CODE = `import "./styles.css";

document.getElementById("app").innerHTML = \`
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
\`;
`;

export default function CodePage() {
  const [language, setLanguage] = useState<'react' | 'vanilla'>('react');
  const [draftCode, setDraftCode] = useState(DEFAULT_REACT_CODE);
  const [activeCode, setActiveCode] = useState(DEFAULT_REACT_CODE);
  const [isRunning, setIsRunning] = useState(false);

  // Update draft code when language changes
  useEffect(() => {
    if (language === 'react') {
      setDraftCode(DEFAULT_REACT_CODE);
      setActiveCode(DEFAULT_REACT_CODE);
    } else {
      setDraftCode(DEFAULT_VANILLA_CODE);
      setActiveCode(DEFAULT_VANILLA_CODE);
    }
  }, [language]);

  const handleRun = () => {
    setIsRunning(true);
    setActiveCode(draftCode);
    // Simulate a small delay for better UX
    setTimeout(() => setIsRunning(false), 500);
  };

  const files: SandpackFiles = language === 'react' 
    ? { '/App.js': activeCode }
    : { 
        '/index.js': activeCode,
        '/styles.css': 'body { font-family: sans-serif; }'
      };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans">
      <Head>
        <title>Code Playground | Blog-Mono</title>
        <meta name="description" content="Online Code Editor and Playground" />
      </Head>

      <div className="flex flex-col h-screen overflow-hidden">
        <div className="px-6 md:px-8 border-b border-[var(--color-border)]">
          <NavBar />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Controls Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-bold flex items-center gap-2">
                <span className="w-2 h-8 bg-[var(--color-accent)] rounded-full"></span>
                Playground
              </h1>
              
              <div className="h-6 w-px bg-[var(--color-border)] mx-2"></div>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-sm font-medium hover:bg-[var(--color-surface)] transition-colors">
                    {language === 'react' ? 'React' : 'Vanilla JS'}
                    <ChevronDown size={14} />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="min-w-[120px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-xl p-1 z-50">
                    <DropdownMenu.Item 
                      className="flex items-center px-3 py-2 text-sm rounded-md outline-none cursor-pointer hover:bg-[var(--color-surface-2)]"
                      onSelect={() => setLanguage('react')}
                    >
                      <span className="flex-1">React</span>
                      {language === 'react' && <Check size={14} />}
                    </DropdownMenu.Item>
                    <DropdownMenu.Item 
                      className="flex items-center px-3 py-2 text-sm rounded-md outline-none cursor-pointer hover:bg-[var(--color-surface-2)]"
                      onSelect={() => setLanguage('vanilla')}
                    >
                      <span className="flex-1">Vanilla JS</span>
                      {language === 'vanilla' && <Check size={14} />}
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setDraftCode(language === 'react' ? DEFAULT_REACT_CODE : DEFAULT_VANILLA_CODE)}
                variant="ghost"
                size="sm"
                className="text-[var(--color-muted)] hover:text-[var(--color-text)]"
              >
                <RotateCcw size={16} className="mr-2" />
                Reset
              </Button>
              <Button 
                onClick={handleRun}
                disabled={isRunning}
                className={cn(
                  "min-w-[100px] transition-all",
                  isRunning ? "opacity-80" : "hover:scale-105"
                )}
              >
                {isRunning ? (
                  <span className="flex items-center">Running...</span>
                ) : (
                  <span className="flex items-center">
                    <Play size={16} className="mr-2 fill-current" />
                    Run Code
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left: Monaco Editor */}
            <div className="flex-1 h-1/2 md:h-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-[var(--color-border)] bg-[#1e1e1e]">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-2 text-xs text-gray-400 px-2">
                  <span className="font-mono">Editor Input</span>
                  <span>{language === 'react' ? 'App.js' : 'index.js'}</span>
                </div>
                <MonacoEditorPanel 
                  code={draftCode} 
                  language={language} 
                  onChange={setDraftCode} 
                />
              </div>
            </div>

            {/* Right: Sandpack Preview */}
            <div className="flex-1 h-1/2 md:h-full md:w-1/2 bg-[var(--color-surface-2)]">
              <SandpackProvider 
                template={language}
                theme="dark"
                files={files}
                options={{
                  externalResources: ["https://cdn.tailwindcss.com"],
                  classes: {
                    "sp-layout": "!h-full !border-none",
                    "sp-preview": "!h-full",
                    "sp-wrapper": "!h-full",
                  }
                }}
                key={language} // Force remount when language changes
              >
                <SandpackLayout className="!h-full !rounded-none !border-none !flex !flex-col">
                  <SandpackPreview 
                    className="!flex-1" 
                    showOpenInCodeSandbox={false} 
                    showRefreshButton={true}
                  />
                  <div className="h-32 border-t border-[var(--color-border)] bg-[#1e1e1e]">
                    <SandpackConsole className="!h-full" />
                  </div>
                </SandpackLayout>
              </SandpackProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
