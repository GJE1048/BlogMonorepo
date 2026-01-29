import React from 'react';
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackPreview, 
} from '@codesandbox/sandpack-react';

interface SandpackPreviewPanelProps {
  code: string;
  template?: 'react' | 'vanilla' | 'static';
  files?: Record<string, any>;
}

export const SandpackPreviewPanel: React.FC<SandpackPreviewPanelProps> = ({ 
  code, 
  template = 'react',
  files = {}
}) => {
  
  // Determine the main file based on template
  const mainFile = template === 'react' ? '/App.js' : '/index.js';
  
  // Merge user code into the main file
  const customFiles = {
    ...files,
    [mainFile]: {
      code: code,
      active: true
    }
  };

  return (
    <div className="h-full w-full border-none overflow-hidden bg-[#1e1e1e]">
      <SandpackProvider 
        template={template} 
        theme="dark"
        files={customFiles}
        options={{
          externalResources: ['https://cdn.tailwindcss.com'],
          classes: {
            "sp-layout": "h-full",
          }
        }}
        customSetup={{ 
          dependencies: { 
            "lucide-react": "latest",
            "clsx": "latest",
            "tailwind-merge": "latest" 
          } 
        }}
      >
        <SandpackLayout style={{ height: '100%', border: 'none', borderRadius: 0 }}>
          <SandpackPreview 
            style={{ height: '100%' }} 
            showOpenInCodeSandbox={false} 
            showRefreshButton={true}
            showNavigator={false}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};
