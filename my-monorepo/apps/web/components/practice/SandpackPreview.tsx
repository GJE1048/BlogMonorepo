import React from 'react';
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackPreview, 
} from '@codesandbox/sandpack-react';

interface SandpackPreviewProps {
  code: string;
  template?: 'react' | 'vanilla' | 'static';
  files?: Record<string, any>;
}

export const SandpackPreview: React.FC<SandpackPreviewProps> = ({ 
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
    <div className="h-full w-full border border-border rounded-lg overflow-hidden">
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
        <SandpackLayout style={{ height: '100%', border: 'none' }}>
          <SandpackPreview 
            style={{ height: '100%' }} 
            showOpenInCodeSandbox={false} 
            showRefreshButton={true}
            showNavigator={true}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};
