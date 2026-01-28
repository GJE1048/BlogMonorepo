# 博客系统 UI 升级与代码文章体验优化开发文档  
*基于 Next.js 14 + Tailwind CSS 的组件化设计实现*

> ⚠️ **注意**：您遇到的 `ETIMEDOUT` 错误是数据库连接问题（非 UI 开发范畴），**附录**中已提供解决方案。本文档聚焦 UI/UX 升级。

---

## 一、设计目标与原则

### 1.1 核心体验升级点
| 体验维度 | 当前痛点 | 升级方案 | 参考系统 |
|----------|----------|----------|----------|
| **内容层次** | 文字密集，缺乏呼吸感 | 卡片式布局 + 智能留白系统 | Notion, Linear |
| **代码可读性** | 无语法高亮/行号/复制功能 | 专业级代码块组件 | GitHub, Dev.to |
| **沉浸阅读** | 无阅读进度/字体调节 | 阅读模式 + 字体缩放控件 | Medium, Readwise |
| **暗色模式** | 仅基础切换 | 智能色彩系统（自动适配代码主题） | VS Code, Obsidian |

### 1.2 技术约束
- ✅ 保留现有 Next.js 14 + App Router 架构
- ✅ 兼容 Vercel Edge Runtime（无 Node.js 依赖）
- ✅ 保持 Lighthouse 性能评分 >90
- ✅ 无障碍访问 (WCAG 2.1 AA)

---

## 二、组件系统设计（`libs/ui` 扩展）

### 2.1 目录结构
```diff
libs/
└── ui/
    ├── components/
    │   ├── blog/
    │   │   ├── ArticleCard.tsx       # 智能文章卡片（含代码标识）
    │   │   ├── CodeBlock/
    │   │   │   ├── index.tsx         # 主组件
    │   │   │   ├── Toolbar.tsx       # 复制/语言标识
    │   │   │   └── LineNumbers.tsx   # 行号系统
    │   │   ├── ReadingProgress.tsx   # 阅读进度条
    │   │   └── FontControls.tsx      # 字体缩放控件
    │   └── layout/
    │       ├── Container.tsx         # 智能内容容器（响应式留白）
    │       └── Sidebar.tsx           # 侧边栏（ProfileCard 升级版）
    └── hooks/
        └── useCodeTheme.ts           # 智能代码主题切换
```

### 2.2 关键组件实现

#### 📌 `CodeBlock` - 专业级代码展示组件
```tsx
// libs/ui/components/blog/CodeBlock/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { highlight, languages } from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface CodeBlockProps {
  code: string;
  language: string;
  fileName?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language,
  fileName,
  showLineNumbers = true
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      import('prismjs').then(() => {
        import(`prismjs/components/prism-${language}.js`);
        document.querySelectorAll('pre code').forEach((block) => {
          highlight(block.textContent || '', languages[language] || languages.js);
        });
      });
    }
  }, [language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return <pre className="animate-pulse bg-gray-200 dark:bg-gray-800 h-48 rounded-lg" />;

  return (
    <div className="group relative my-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0d1117] transition-all hover:shadow-lg">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-800">
        {fileName && (
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300 truncate max-w-[200px] md:max-w-none">
            {fileName}
          </span>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-gray-500 hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="复制代码"
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
            {language}
          </span>
        </div>
      </div>

      {/* 代码内容区 */}
      <div className="overflow-x-auto">
        <pre 
          className={`language-${language} ${showLineNumbers ? 'line-numbers' : ''} m-0`}
          style={{ 
            fontSize: '0.875rem',
            lineHeight: '1.65',
            tabSize: 2,
            MozTabSize: 2
          }}
        >
          <code 
            className={`language-${language} block p-4 min-w-[300px]`}
            dangerouslySetInnerHTML={{ 
              __html: highlight(code, languages[language] || languages.js, language) 
            }} 
          />
        </pre>
      </div>

      {/* 悬浮装饰条（增强代码块识别度） */}
      <div 
        className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
    </div>
  );
}
```

#### 📌 `ArticleCard` - 智能文章卡片（区分普通/代码文章）
```tsx
// libs/ui/components/blog/ArticleCard.tsx
interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  tags: string[];
  isCodeArticle?: boolean; // 标识技术文章
  href: string;
}

export function ArticleCard({
  title,
  excerpt,
  date,
  readingTime,
  tags,
  isCodeArticle = false,
  href
}: ArticleCardProps) {
  return (
    <a 
      href={href}
      className="group block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5"
    >
      <div className="p-6">
        {/* 标签系统 - 代码文章特殊标识 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {isCodeArticle && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              技术
            </span>
          )}
          {tags.slice(0, 2).map((tag, i) => (
            <span 
              key={i} 
              className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 标题 - 代码文章使用等宽字体增强识别 */}
        <h2 className={`text-xl font-bold mb-3 line-clamp-2 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 ${
          isCodeArticle ? 'font-mono tracking-tight' : ''
        }`}>
          {title}
        </h2>

        {/* 摘要 */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* 元数据 */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={date}>{new Date(date).toLocaleDateString('zh-CN')}</time>
          <span className="mx-2">•</span>
          <span>{readingTime} 分钟阅读</span>
          
          {/* 代码文章专属指标 */}
          {isCodeArticle && (
            <>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {Math.ceil(excerpt.split('\n').length / 20)} 个代码片段
              </span>
            </>
          )}
        </div>
      </div>
    </a>
  );
}
```

---

## 三、全局样式系统

### 3.1 智能留白系统（`libs/ui/styles/spacing.css`）
```css
/* 响应式内容容器 - 根据内容类型自动调整留白 */
.prose-container {
  @apply max-w-3xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* 代码文章专用容器 - 更宽的代码展示区 */
.prose-container.code-article {
  @apply max-w-4xl;
}

/* 智能段落间距 */
.prose > p {
  @apply my-6;
}

.prose > p + p {
  @apply mt-4;
}

/* 代码块专属间距 */
.prose pre {
  @apply my-8;
}

/* 标题呼吸感 */
.prose h2 {
  @apply mt-12 mb-4;
}

.prose h3 {
  @apply mt-10 mb-3;
}
```

### 3.2 暗色模式智能适配（`libs/ui/hooks/useCodeTheme.ts`）
```ts
// libs/ui/hooks/useCodeTheme.ts
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function useCodeTheme() {
  const { resolvedTheme } = useTheme();
  const [codeTheme, setCodeTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // 根据系统主题智能切换代码高亮主题
    if (resolvedTheme === 'dark' || 
        (!resolvedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setCodeTheme('dark');
      document.documentElement.classList.add('dark-code');
      document.documentElement.classList.remove('light-code');
    } else {
      setCodeTheme('light');
      document.documentElement.classList.add('light-code');
      document.documentElement.classList.remove('dark-code');
    }
  }, [resolvedTheme]);

  return codeTheme;
}
```

---

## 四、页面集成方案

### 4.1 文章列表页 (`app/blog/page.tsx`)
```tsx
import { ArticleCard } from '@/ui/components/blog/ArticleCard';
import { Container } from '@/ui/components/layout/Container';

export default function BlogPage() {
  const articles = [
    {
      title: "TypeScript 5.0 新特性深度解析",
      excerpt: "深入探讨装饰器、const 修饰符等新特性在实际项目中的应用...",
      date: "2026-01-25",
      readingTime: 8,
      tags: ["TypeScript", "前端"],
      isCodeArticle: true,
      href: "/blog/typescript-5"
    },
    // ...其他文章
  ];

  return (
    <Container className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article, i) => (
          <ArticleCard key={i} {...article} />
        ))}
      </div>
    </Container>
  );
}
```

### 4.2 文章详情页 (`app/blog/[slug]/page.tsx`)
```tsx
import { CodeBlock } from '@/ui/components/blog/CodeBlock';
import { ReadingProgress } from '@/ui/components/blog/ReadingProgress';
import { FontControls } from '@/ui/components/blog/FontControls';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // 从 CMS 获取文章数据
  const article = getArticle(params.slug);
  
  return (
    <div className="relative">
      {/* 阅读进度条 - 固定在顶部 */}
      <ReadingProgress />
      
      <article className="prose prose-container max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* 字体控制工具 - 右侧悬浮 */}
        <FontControls className="fixed right-8 top-24 hidden lg:block" />
        
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {article.title}
          </h1>
          <div className="text-gray-500 dark:text-gray-400">
            {article.date} • {article.readingTime} 分钟阅读
          </div>
        </header>
        
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* 代码块自动识别（Markdown 解析时注入） */}
        {/* 实际实现：在 MDX 组件映射中注册 <pre> 标签 */}
      </article>
    </div>
  );
}
```

---

## 五、MDX 集成方案（支持代码文章）

### 5.1 自定义 MDX 组件映射 (`app/blog/[slug]/mdx-components.tsx`)
```tsx
import { CodeBlock } from '@/ui/components/blog/CodeBlock';

export const components = {
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const match = /language-(\w+)/.exec(className || '');
    const codeString = (props.children as any)?.props?.children || '';
    
    return match ? (
      <CodeBlock
        code={codeString}
        language={match[1]}
        fileName={(props['data-filename'] as string) || undefined}
        showLineNumbers={true}
      />
    ) : (
      <pre className={className} {...props} />
    );
  }
};
```

### 5.2 代码文章写作规范
```markdown
---
title: "React Server Components 实战指南"
isCodeArticle: true  # 标识为代码文章
tags: ["React", "Next.js", "RSC"]
---

## 核心概念

RSC 允许在服务器端渲染组件，减少客户端 JavaScript 体积：

```tsx filename=app/page.tsx
// app/page.tsx
import ProductList from './ProductList';

export default async function Home() {
  // 直接在 Server Component 中获取数据
  const products = await db.products.findMany();
  
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">产品列表</h1>
      <ProductList products={products} /> {/* 传递序列化数据 */}
    </main>
  );
}
```

> 💡 **最佳实践**：使用 `filename` 属性标注文件路径，增强代码上下文理解
```

---

## 六、性能优化策略

| 优化点 | 方案 | 预期收益 |
|--------|------|----------|
| **代码高亮** | 按需加载 Prism.js 语言包 | 减少 40% JS 体积 |
| **图片懒加载** | `loading="lazy"` + 占位符 | LCP 提升 30% |
| **暗色模式** | CSS 变量 + `prefers-color-scheme` | 无 JS 闪烁 |
| **字体加载** | `font-display: swap` + 预加载 | FOUT 消除 |

---

## 附录：数据库连接问题解决方案

您遇到的 `ETIMEDOUT` 错误是 **数据库连接超时**，与 UI 开发无关，但需解决才能继续开发：

### 根本原因
- 本地开发环境无法连接远程 PostgreSQL（AWS RDS/Vercel Postgres）
- 常见于：安全组未开放本地 IP / 数据库未启用公网访问 / 网络防火墙拦截

### 解决方案
```bash
# 1. 检查 DATABASE_URL 格式（.env.local）
# 正确格式（含 sslmode）：
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=verify-full"

# 2. 临时解决方案（开发环境）：
# 在 drizzle.config.ts 中添加：
export default defineConfig({
  schema,
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: process.env.NODE_ENV === 'production' 
      ? { rejectUnauthorized: true } 
      : false // ⚠️ 仅开发环境禁用 SSL 验证
  }
})

# 3. 永久解决方案：
# - AWS RDS: 修改安全组，添加本地公网 IP (0.0.0.0/0 仅测试用)
# - Vercel Postgres: 在 Dashboard 启用 "Allow connections from anywhere"
# - 使用 SSH 隧道连接（推荐生产环境）
```

> 🔒 **安全提示**：生产环境务必使用 `sslmode=verify-full`，开发环境临时禁用 SSL 仅用于调试。

---

## 七、交付物清单

- [ ] `libs/ui` 组件库扩展（含 CodeBlock/ArticleCard）
- [ ] 全局样式系统（spacing.css + 暗色模式适配）
- [ ] MDX 组件映射配置
- [ ] 文章列表/详情页集成示例
- [ ] 代码文章写作规范文档
- [ ] 性能优化 checklist

> 💡 **实施建议**：优先实现 `CodeBlock` 组件（技术文章体验提升最明显），再逐步扩展其他组件。所有组件均支持 SSR，完美兼容 Vercel 部署。