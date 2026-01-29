import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Play, Save, CheckCircle2, RotateCcw, Loader2 } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { getProblemBySlug } from '../../data/problems';
import { CodeEditor } from '../../components/practice/CodeEditor';
import { DifficultyBadge } from '../../components/practice/DifficultyBadge';
import { TagPill } from '../../components/practice/TagPill';
import { usePracticeStore } from '../../store/practiceStore';
import { MarkdownRenderer } from '../../components/MarkdownRenderer';
import { cn } from '../../lib/cn';
import { Button } from '../../components/ui/Button';
import { fetchAuthor } from '../../lib/api';
import type { Author } from '../../lib/types';

export default function ProblemDetailPage({ author }: { author: Author }) {
  const router = useRouter();
  const { slug } = router.query;
  const problem = getProblemBySlug(slug as string);
  
  const { getCode, saveCode, updateProgress } = usePracticeStore((state: any) => state);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'solution'>('description');

  useEffect(() => {
    if (problem) {
      const saved = getCode(problem.id);
      setCode(saved || problem.templateCode);
    }
  }, [problem, getCode]);

  if (!problem) {
    return (
      <Layout author={author}>
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
          <Link href="/practice" className="text-primary hover:underline">
            Back to Practice
          </Link>
        </div>
      </Layout>
    );
  }

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    
    // Simple mock execution
    setTimeout(() => {
      try {
        // In a real app, this would use a secure sandbox or web worker
        // This is just a simulation for UI purposes
        const log: string[] = [];
        const mockConsole = {
          log: (...args: any[]) => log.push(args.map(a => JSON.stringify(a)).join(' '))
        };
        
        // Very unsafe eval, just for demo. DO NOT USE IN PRODUCTION without sandboxing
        // const fn = new Function('console', code + '\nreturn twoSum([2,7,11,15], 9);');
        // const result = fn(mockConsole);
        
        setOutput(`Running tests...\n\nTest Case 1: Passed\nTest Case 2: Passed\n\nResult: Accepted!`);
        updateProgress(problem.id, { status: 'solved', attempts: (usePracticeStore.getState() as any).progress[problem.id]?.attempts || 0 + 1 });
      } catch (err: any) {
        setOutput(`Error: ${err.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  const handleSave = () => {
    saveCode(problem.id, code);
  };

  const handleReset = () => {
    if (confirm('Reset code to template?')) {
      setCode(problem.templateCode);
    }
  };

  return (
    <Layout author={author}>
      <div className="h-[calc(100vh-64px)] flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/practice" className="p-2 hover:bg-secondary rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="font-bold text-lg flex items-center gap-2">
                {problem.id}. {problem.title}
                <DifficultyBadge difficulty={problem.difficulty} />
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset} title="Reset Code">
              <RotateCcw size={16} />
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save size={16} className="mr-2" /> Save
            </Button>
            <Button size="sm" onClick={handleRun} disabled={isRunning}>
              {isRunning ? <Loader2 size={16} className="animate-spin mr-2" /> : <Play size={16} className="mr-2" />}
              Run
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Description */}
          <div className="w-1/2 border-r border-border flex flex-col bg-card/50">
            <div className="flex border-b border-border">
              <button
                className={cn(
                  "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                  activeTab === 'description' 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={cn(
                  "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                  activeTab === 'solution' 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setActiveTab('solution')}
              >
                Solution
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 prose prose-invert max-w-none">
              {activeTab === 'description' ? (
                <>
                  <MarkdownRenderer content={problem.description} />
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-lg font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.map(tag => (
                        <TagPill key={tag} tag={tag} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-muted-foreground">
                  Solution is not available yet.
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Editor & Console */}
          <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
            <div className="flex-1 overflow-hidden relative">
              <CodeEditor 
                value={code} 
                onChange={(val) => setCode(val || '')} 
                language="javascript"
              />
            </div>
            
            {/* Console/Output */}
            <div className="h-1/3 border-t border-border bg-card flex flex-col">
              <div className="px-4 py-2 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Console Output
              </div>
              <div className="flex-1 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap text-muted-foreground">
                {output || 'Run your code to see output here...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const author = await fetchAuthor('1');
  return {
    props: {
      author,
    },
  };
}
