
import React from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useTheme } from '../../lib/theme';

interface MonacoEditorPanelProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
}

const MonacoEditorPanel: React.FC<MonacoEditorPanelProps> = ({ code, language, onChange }) => {
  const { theme } = useTheme();

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // You can configure the editor here
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      fontFamily: 'JetBrains Mono, monospace',
      scrollBeyondLastLine: false,
      padding: { top: 16, bottom: 16 },
    });
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#1e1e1e]">
      <Editor
        height="100%"
        language={language === 'react' ? 'javascript' : language}
        theme={theme === 'dark' ? 'vs-dark' : 'light'} // Better to stick to vs-dark for code editors usually, or match theme
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default MonacoEditorPanel;
