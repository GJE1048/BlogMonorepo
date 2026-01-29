import React from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useTheme } from '../../lib/theme';
import { Loader2 } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value, 
  onChange, 
  language = 'javascript',
  readOnly = false 
}) => {
  const { theme } = useTheme();
  
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Configure editor options here if needed
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
      }
    });
  };

  return (
    <div className="h-full w-full min-h-[400px] border border-border rounded-lg overflow-hidden bg-[#1e1e1e]">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={value}
        onChange={onChange}
        theme={theme === 'light' ? 'light' : 'vs-dark'}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          readOnly,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
        }}
        loading={
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <Loader2 className="animate-spin mr-2" />
            Loading Editor...
          </div>
        }
      />
    </div>
  );
};
