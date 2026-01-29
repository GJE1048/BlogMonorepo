## 📚 练习题功能开发方案

### 1. 功能概述

创建一个**前端刷题平台**，集成 LeetCode 热门前端面试题，提供：
- 题目浏览与筛选
- 在线代码编辑与运行
- 题解讨论与收藏
- 刷题进度追踪
- 保持现有博客的暗色系 UI 风格

---

### 2. 技术方案

#### 2.1 核心技术栈
```json
{
  "monaco-editor": "^0.45.0",
  "@monaco-editor/react": "^4.6.0",
  "react": "^18.2.0",
  "react-router-dom": "^6.21.1",
  "zustand": "^4.4.7",        // 状态管理
  "dayjs": "^1.11.10",        // 日期处理
  "clsx": "^2.1.0",           // CSS 工具
  "lucide-react": "^0.344.0"  // 图标
}
```

#### 2.2 数据来源方案
| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **自建题库 JSON** | 完全可控，无需 API | 需手动维护 | ⭐⭐⭐⭐⭐ |
| LeetCode GraphQL API | 实时数据 | 有反爬，不稳定 | ⭐⭐ |
| LeetCode-CN API | 中文友好 | 需要后端代理 | ⭐⭐⭐ |
| 爬虫 + 缓存 | 数据丰富 | 维护成本高 | ⭐⭐ |

**推荐方案：自建精选题库 + 手动维护**

---

### 3. 项目结构

```
src/
├── pages/
│   └── Practice/                    # 练习题页面
│       ├── index.tsx               # 题目列表页
│       ├── ProblemDetail.tsx       # 题目详情页
│       ├── EditorPanel.tsx         # 代码编辑器
│       ├── TestCasePanel.tsx       # 测试用例
│       └── DiscussionPanel.tsx     # 题解讨论
├── components/
│   ├── practice/
│   │   ├── ProblemCard.tsx         # 题目卡片
│   │   ├── DifficultyBadge.tsx     # 难度徽章
│   │   ├── TagPill.tsx             # 标签
│   │   ├── CodeEditor.tsx          # 代码编辑器组件
│   │   └── TestCaseRunner.tsx      # 测试运行器
│   └── layout/
│       └── PracticeLayout.tsx      # 练习题布局
├── data/
│   └── problems/                   # 题目数据
│       ├── index.ts                # 题目列表导出
│       ├── 001-two-sum.ts          # 具体题目
│       ├── 002-debounce.ts
│       ├── 003-throttle.ts
│       └── ...
├── store/
│   └── practiceStore.ts            # 刷题状态管理
├── types/
│   └── problem.ts                  # TypeScript 类型定义
└── styles/
    └── practice.css                # 练习题样式
```

---

### 4. 数据模型设计

#### 4.1 题目数据结构
```typescript
// src/types/problem.ts
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TestCase {
  input: any;
  output: any;
  description?: string;
}

export interface Problem {
  id: string;                    // 题目ID，如 "001-two-sum"
  title: string;                 // 题目标题
  slug: string;                  // URL 友好名
  difficulty: Difficulty;        // 难度
  tags: string[];                // 标签：['数组', '双指针', '前端']
  category: string;              // 分类：'JavaScript', 'React', '算法'
  description: string;           // 题目描述（Markdown）
  templateCode: string;          // 代码模板
  solutionCode?: string;         // 参考答案
  testCases: TestCase[];         // 测试用例
  hints: string[];               // 提示
  relatedProblems?: string[];    // 相关题目
  createdAt: string;             // 创建时间
  solvedCount?: number;          // 被解决次数
  accepted?: boolean;            // 用户是否已通过
}

export interface UserProgress {
  problemId: string;
  status: 'unsolved' | 'attempted' | 'solved';
  attempts: number;
  lastAttempted?: string;
  code?: string;                 // 用户最后一次提交的代码
}
```

#### 4.2 示例题目数据
```typescript
// src/data/problems/001-two-sum.ts
import type { Problem } from '@/types/problem';

export const twoSumProblem: Problem = {
  id: '001-two-sum',
  title: '两数之和',
  slug: 'two-sum',
  difficulty: 'easy',
  tags: ['数组', '哈希表', 'JavaScript'],
  category: 'JavaScript 基础',
  description: `
## 题目描述

给定一个整数数组 \`nums\` 和一个整数目标值 \`target\`，请你在该数组中找出和为目标值的那两个整数，并
## 📚 练习题功能开发方案

### 1. 功能概述

创建一个**前端刷题平台**，集成 LeetCode 热门前端面试题，提供：
- 题目浏览与筛选
- 在线代码编辑与运行
- 题解讨论与收藏
- 刷题进度追踪
- 保持现有博客的暗色系 UI 风格

---

### 2. 技术方案

#### 2.1 核心技术栈
```json
{
  "monaco-editor": "^0.45.0",
  "@monaco-editor/react": "^4.6.0",
  "react": "^18.2.0",
  "react-router-dom": "^6.21.1",
  "zustand": "^4.4.7",        // 状态管理
  "dayjs": "^1.11.10",        // 日期处理
  "clsx": "^2.1.0",           // CSS 工具
  "lucide-react": "^0.344.0"  // 图标
}
```

#### 2.2 数据来源方案
| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **自建题库 JSON** | 完全可控，无需 API | 需手动维护 | ⭐⭐⭐⭐⭐ |
| LeetCode GraphQL API | 实时数据 | 有反爬，不稳定 | ⭐⭐ |
| LeetCode-CN API | 中文友好 | 需要后端代理 | ⭐⭐⭐ |
| 爬虫 + 缓存 | 数据丰富 | 维护成本高 | ⭐⭐ |

**推荐方案：自建精选题库 + 手动维护**

---

### 3. 项目结构

```
src/
├── pages/
│   └── Practice/                    # 练习题页面
│       ├── index.tsx               # 题目列表页
│       ├── ProblemDetail.tsx       # 题目详情页
│       ├── EditorPanel.tsx         # 代码编辑器
│       ├── TestCasePanel.tsx       # 测试用例
│       └── DiscussionPanel.tsx     # 题解讨论
├── components/
│   ├── practice/
│   │   ├── ProblemCard.tsx         # 题目卡片
│   │   ├── DifficultyBadge.tsx     # 难度徽章
│   │   ├── TagPill.tsx             # 标签
│   │   ├── CodeEditor.tsx          # 代码编辑器组件
│   │   └── TestCaseRunner.tsx      # 测试运行器
│   └── layout/
│       └── PracticeLayout.tsx      # 练习题布局
├── data/
│   └── problems/                   # 题目数据
│       ├── index.ts                # 题目列表导出
│       ├── 001-two-sum.ts          # 具体题目
│       ├── 002-debounce.ts
│       ├── 003-throttle.ts
│       └── ...
├── store/
│   └── practiceStore.ts            # 刷题状态管理
├── types/
│   └── problem.ts                  # TypeScript 类型定义
└── styles/
    └── practice.css                # 练习题样式
```

---

### 4. 数据模型设计

#### 4.1 题目数据结构
```typescript
// src/types/problem.ts
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TestCase {
  input: any;
  output: any;
  description?: string;
}

export interface Problem {
  id: string;                    // 题目ID，如 "001-two-sum"
  title: string;                 // 题目标题
  slug: string;                  // URL 友好名
  difficulty: Difficulty;        // 难度
  tags: string[];                // 标签：['数组', '双指针', '前端']
  category: string;              // 分类：'JavaScript', 'React', '算法'
  description: string;           // 题目描述（Markdown）
  templateCode: string;          // 代码模板
  solutionCode?: string;         // 参考答案
  testCases: TestCase[];         // 测试用例
  hints: string[];               // 提示
  relatedProblems?: string[];    // 相关题目
  createdAt: string;             // 创建时间
  solvedCount?: number;          // 被解决次数
  accepted?: boolean;            // 用户是否已通过
}

export interface UserProgress {
  problemId: string;
  status: 'unsolved' | 'attempted' | 'solved';
  attempts: number;
  lastAttempted?: string;
  code?: string;                 // 用户最后一次提交的代码
}
```

#### 4.2 示例题目数据
```typescript
// src/data/problems/001-two-sum.ts
import type { Problem } from '@/types/problem';

export const twoSumProblem: Problem = {
  id: '001-two-sum',
  title: '两数之和',
  slug: 'two-sum',
  difficulty: 'easy',
  tags: ['数组', '哈希表', 'JavaScript'],
  category: 'JavaScript 基础',
  description: `
## 题目描述

给定一个整数数组 \`nums\` 和一个整数目标值 \`target\`，请你在该数组中找出和为目标值的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

## 示例

\`\`\`javascript
输入: nums = [2, 7, 11, 15], target = 9
输出: [0, 1]
解释: 因为 nums[0] + nums[1] == 9，返回 [0, 1]。
\`\`\`

## 限制条件

- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
`,
  templateCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // 你的代码写在这里
  
}`,
  solutionCode: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`,
  testCases: [
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      output: [0, 1],
    },
    {
      input: { nums: [3, 2, 4], target: 6 },
      output: [1, 2],
    },
    {
      input: { nums: [3, 3], target: 6 },
      output: [0, 1],
    },
  ],
  hints: [
    '可以使用哈希表来存储已经遍历过的数字',
    '时间复杂度可以优化到 O(n)',
  ],
  relatedProblems: ['002-three-sum', '003-container-with-most-water'],
  createdAt: '2026-01-29',
};
```

---

### 5. 路由配置

#### 5.1 添加导航链接
```tsx
// src/components/layout/Header.tsx
<nav className="flex items-center gap-8">
  <Link to="/" className="hover:text-[var(--accent)] transition">首页</Link>
  <Link to="/column" className="hover:text-[var(--accent)] transition">专栏</Link>
  <Link to="/about" className="hover:text-[var(--accent)] transition">关于</Link>
  <Link to="/code" className="hover:text-[var(--accent)] transition">代码</Link>
  <Link to="/practice" className="hover:text-[var(--accent)] transition">🔥 练习题</Link>
</nav>
```

#### 5.2 路由配置
```tsx
// src/App.tsx 或路由文件
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PracticePage from './pages/Practice';
import ProblemDetailPage from './pages/Practice/ProblemDetail';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/column" element={<ColumnPage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/code" element={<CodeEditorPage />} />
  
  {/* 练习题路由 */}
  <Route path="/practice" element={<PracticePage />} />
  <Route path="/practice/:slug" element={<ProblemDetailPage />} />
</Routes>
```

---

### 6. 核心页面实现

#### 6.1 题目列表页
```tsx
// src/pages/Practice/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { problems } from '@/data/problems';
import ProblemCard from '@/components/practice/ProblemCard';
import DifficultyBadge from '@/components/practice/DifficultyBadge';
import TagPill from '@/components/practice/TagPill';

const PracticePage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    difficulty: '',
    category: '',
    tag: '',
    search: '',
  });

  const filteredProblems = problems.filter(problem => {
    const matchDifficulty = !filter.difficulty || problem.difficulty === filter.difficulty;
    const matchCategory = !filter.category || problem.category === filter.category;
    const matchTag = !filter.tag || problem.tags.includes(filter.tag);
    const matchSearch = !filter.search || 
      problem.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      problem.description.toLowerCase().includes(filter.search.toLowerCase());
    
    return matchDifficulty && matchCategory && matchTag && matchSearch;
  });

  return (
    <div className="prose-container">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">🔥 前端刷题练习</h1>
        <p className="text-[var(--muted)]">
          精选热门前端面试题，涵盖 JavaScript、React、算法等方向
        </p>
      </div>

      {/* 筛选栏 */}
      <div className="bg-[var(--card)] rounded-lg p-6 mb-8 border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="🔍 搜索题目..."
            className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
          
          <select
            className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            value={filter.difficulty}
            onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
          >
            <option value="">全部难度</option>
            <option value="easy">简单</option>
            <option value="medium">中等</option>
            <option value="hard">困难</option>
          </select>

          <select
            className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="">全部分类</option>
            <option value="JavaScript 基础">JavaScript 基础</option>
            <option value="React">React</option>
            <option value="算法">算法</option>
            <option value="CSS">CSS</option>
          </select>

          <button
            className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition"
            onClick={() => setFilter({ difficulty: '', category: '', tag: '', search: '' })}
          >
            重置筛选
          </button>
        </div>
      </div>

      {/* 题目统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
          <div className="text-3xl font-bold text-[var(--accent)]">{problems.length}</div>
          <div className="text-[var(--muted)]">总题目数</div>
        </div>
        <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
          <div className="text-3xl font-bold text-green-500">
            {problems.filter(p => p.accepted).length}
          </div>
          <div className="text-[var(--muted)]">已解决</div>
        </div>
        <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
          <div className="text-3xl font-bold text-yellow-500">
            {Math.round((problems.filter(p => p.accepted).length / problems.length) * 100)}%
          </div>
          <div className="text-[var(--muted)]">完成进度</div>
        </div>
      </div>

      {/* 题目列表 */}
      <div className="space-y-4">
        {filteredProblems.map(problem => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            onClick={() => navigate(`/practice/${problem.slug}`)}
          />
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12 text-[var(--muted)]">
          没有找到符合条件的题目 😢
        </div>
      )}
    </div>
  );
};

export default PracticePage;
```

#### 6.2 题目卡片组件
```tsx
// src/components/practice/ProblemCard.tsx
import React from 'react';
import { Problem } from '@/types/problem';
import DifficultyBadge from './DifficultyBadge';
import TagPill from './TagPill';

interface ProblemCardProps {
  problem: Problem;
  onClick?: () => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onClick }) => {
  return (
    <div
      className="bg-[var(--card)] rounded-lg p-6 border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 hover:text-[var(--accent)] transition">
            {problem.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {problem.tags.map(tag => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
          <p className="text-[var(--muted)] text-sm line-clamp-2">
            {problem.description.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100)}...
          </p>
        </div>
        
        <div className="flex flex-col items-end justify-start ml-4">
          <DifficultyBadge difficulty={problem.difficulty} />
          {problem.accepted && (
            <span className="text-green-500 text-sm mt-2">✅ 已通过</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
```

#### 6.3 难度徽章组件
```tsx
// src/components/practice/DifficultyBadge.tsx
import React from 'react';

interface DifficultyBadgeProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

const difficultyConfig = {
  easy: { color: 'bg-green-500/20 text-green-400', text: '简单' },
  medium: { color: 'bg-yellow-500/20 text-yellow-400', text: '中等' },
  hard: { color: 'bg-red-500/20 text-red-400', text: '困难' },
};

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  const config = difficultyConfig[difficulty];
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.text}
    </span>
  );
};

export default DifficultyBadge;
```

#### 6.4 标签组件
```tsx
// src/components/practice/TagPill.tsx
import React from 'react';

interface TagPillProps {
  tag: string;
}

const TagPill: React.FC<TagPillProps> = ({ tag }) => {
  const tagColors: Record<string, string> = {
    JavaScript: 'bg-blue-500/20 text-blue-400',
    React: 'bg-cyan-500/20 text-cyan-400',
    算法: 'bg-purple-500/20 text-purple-400',
    CSS: 'bg-pink-500/20 text-pink-400',
    前端: 'bg-indigo-500/20 text-indigo-400',
  };

  const color = tagColors[tag] || 'bg-gray-500/20 text-gray-400';

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
      {tag}
    </span>
  );
};

export default TagPill;
```

---

### 7. 题目详情页

```tsx
// src/pages/Practice/ProblemDetail.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { problems } from '@/data/problems';
import CodeEditor from '@/components/practice/CodeEditor';
import TestCaseRunner from '@/components/practice/TestCaseRunner';
import DiscussionPanel from './DiscussionPanel';
import { usePracticeStore } from '@/store/practiceStore';

const ProblemDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { updateProgress } = usePracticeStore();
  
  const problem = problems.find(p => p.slug === slug);
  
  const [userCode, setUserCode] = useState(problem?.templateCode || '');
  const [result, setResult] = useState<{ passed: boolean; message: string } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'discussion'>('editor');

  if (!problem) {
    return (
      <div className="prose-container text-center py-20">
        <h2>题目不存在</h2>
        <button 
          onClick={() => navigate('/practice')}
          className="mt-4 px-6 py-2 bg-[var(--accent)] text-white rounded-lg"
        >
          返回题目列表
        </button>
      </div>
    );
  }

  const handleRun = () => {
    try {
      // 执行代码逻辑
      const fn = new Function(`
        return (function() {
          ${userCode}
          return ${problem.title.split(' ')[0]} || twoSum;
        })();
      `)();
      
      let allPassed = true;
      
      for (const testCase of problem.testCases) {
        const output = fn(testCase.input.nums, testCase.input.target);
        if (JSON.stringify(output) !== JSON.stringify(testCase.output)) {
          allPassed = false;
          setResult({
            passed: false,
            message: `测试用例失败:\n输入: ${JSON.stringify(testCase.input)}\n期望: ${JSON.stringify(testCase.output)}\n实际: ${JSON.stringify(output)}`
          });
          break;
        }
      }
      
      if (allPassed) {
        setResult({ passed: true, message: '✅ 所有测试用例通过！' });
        updateProgress(problem.id, 'solved', userCode);
      }
    } catch (error) {
      setResult({
        passed: false,
        message: `❌ 执行错误: ${error instanceof Error ? error.message : '未知错误'}`
      });
    }
  };

  const handleReset = () => {
    setUserCode(problem.templateCode);
    setResult(null);
  };

  const handleShowSolution = () => {
    if (problem.solutionCode) {
      setUserCode(problem.solutionCode);
      setShowSolution(true);
    }
  };

  return (
    <div className="prose-container max-w-6xl">
      {/* 面包屑 */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/practice')}
          className="text-[var(--accent)] hover:underline"
        >
          ← 返回题目列表
        </button>
      </div>

      {/* 题目头部 */}
      <div className="bg-[var(--card)] rounded-lg p-8 mb-8 border border-[var(--border)]">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
            <div className="flex flex-wrap gap-2">
              <DifficultyBadge difficulty={problem.difficulty} />
              {problem.tags.map(tag => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          </div>
          {problem.accepted && (
            <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium">
              ✅ 已通过
            </span>
          )}
        </div>

        {/* 题目描述 */}
        <div 
          className="prose prose-invert mt-6"
          dangerouslySetInnerHTML={{ __html: problem.description }}
        />
      </div>

      {/* 控制栏 */}
      <div className="bg-[var(--card)] rounded-lg p-4 mb-6 border border-[var(--border)]">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRun}
            className="px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition"
          >
            ▶ 运行代码
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-[var(--surface)] text-[var(--text)] rounded-lg hover:bg-[var(--surface-2)] transition"
          >
            ⟳ 重置代码
          </button>
          <button
            onClick={handleShowSolution}
            className="px-6 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition"
          >
            💡 显示题解
          </button>
          <div className="flex-1" />
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'editor' 
                  ? 'bg-[var(--accent)] text-white' 
                  : 'bg-[var(--surface)] text-[var(--text)]'
              }`}
            >
              编辑器
            </button>
            <button
              onClick={() => setActiveTab('discussion')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'discussion' 
                  ? 'bg-[var(--accent)] text-white' 
                  : 'bg-[var(--surface)] text-[var(--text)]'
              }`}
            >
              讨论 ({problem.testCases.length})
            </button>
          </div>
        </div>

        {/* 运行结果 */}
        {result && (
          <div 
            className={`mt-4 p-4 rounded-lg ${
              result.passed 
                ? 'bg-green-500/10 border border-green-500/30' 
                : 'bg-red-500/10 border border-red-500/30'
            }`}
          >
            <pre className="whitespace-pre-wrap font-mono text-sm">{result.message}</pre>
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：代码编辑器 */}
        <div className={activeTab === 'editor' ? '' : 'hidden lg:block'}>
          <CodeEditor
            code={userCode}
            onChange={setUserCode}
            language="javascript"
          />
        </div>

        {/* 右侧：测试用例或讨论 */}
        <div>
          {activeTab === 'editor' ? (
            <TestCaseRunner testCases={problem.testCases} />
          ) : (
            <DiscussionPanel problemId={problem.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;
```

---

### 8. 代码编辑器组件

```tsx
// src/components/practice/CodeEditor.tsx
import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language = 'javascript' }) => {
  return (
    <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] overflow-hidden">
      <div className="bg-[var(--surface-2)] px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
        <span className="text-sm font-mono text-[var(--muted)]">code.js</span>
        <div className="flex gap-2">
          <span className="text-xs text-[var(--muted)]">{language.toUpperCase()}</span>
        </div>
      </div>
      
      <Editor
        height="600px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
```

---

### 9. 状态管理

```typescript
// src/store/practiceStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProgress {
  problemId: string;
  status: 'unsolved' | 'attempted' | 'solved';
  attempts: number;
  lastAttempted?: string;
  code?: string;
}

interface PracticeStore {
  progress: Record<string, UserProgress>;
  updateProgress: (problemId: string, status: UserProgress['status'], code?: string) => void;
  resetProgress: () => void;
}

export const usePracticeStore = create<PracticeStore>()(
  persist(
    (set) => ({
      progress: {},
      
      updateProgress: (problemId, status, code) => {
        set((state) => {
          const current = state.progress[problemId] || {
            problemId,
            status: 'unsolved',
            attempts: 0,
          };
          
          return {
            progress: {
              ...state.progress,
              [problemId]: {
                ...current,
                status,
                attempts: current.attempts + 1,
                lastAttempted: new Date().toISOString(),
                code,
              },
            },
          };
        });
      },
      
      resetProgress: () => set({ progress: {} }),
    }),
    {
      name: 'practice-progress',
    }
  )
);
```

---

### 10. 样式文件

```css
/* src/styles/practice.css */
.practice-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.problem-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.problem-card:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.difficulty-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.difficulty-easy {
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

.difficulty-medium {
  background: rgba(234, 179, 8, 0.2);
  color: #eab308;
}

.difficulty-hard {
  background: rgba(248, 113, 113, 0.2);
  color: #f87171;
}

.tag-pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.test-case-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 12px;
}

.test-case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.test-case-passed {
  color: #4ade80;
  font-weight: 600;
}

.test-case-failed {
  color: #f87171;
  font-weight: 600;
}
```

---

### 11. 初期题目清单（建议 20 道）

| 编号 | 题目 | 难度 | 分类 | 标签 |
|------|------|------|------|------|
| 001 | 两数之和 | 简单 | 算法 | 数组、哈希表 |
| 002 | 防抖函数 | 简单 | JavaScript | 函数、闭包 |
| 003 | 节流函数 | 简单 | JavaScript | 函数、定时器 |
| 004 | 深拷贝 | 中等 | JavaScript | 对象、递归 |
| 005 | 数组扁平化 | 简单 | JavaScript | 数组、递归 |
| 006 | 柯里化 | 中等 | JavaScript | 函数、高阶函数 |
| 007 | Promise.all 实现 | 中等 | JavaScript | Promise、异步 |
| 008 | 发布订阅模式 | 中等 | JavaScript | 设计模式 |
| 009 | 数组去重 | 简单 | JavaScript | 数组、Set |
| 010 | 手写 call/apply/bind | 中等 | JavaScript | this、原型 |
| 011 | 三数之和 | 中等 | 算法 | 数组、双指针 |
| 012 | 最长无重复子串 | 中等 | 算法 | 字符串、滑动窗口 |
| 013 | 反转链表 | 中等 | 算法 | 链表 |
| 014 | 二叉树遍历 | 中等 | 算法 | 树、递归 |
| 015 | 实现 React Hooks | 困难 | React | Hooks、闭包 |
| 016 | 虚拟 DOM Diff | 困难 | React | 算法、树 |
| 017 | 路由实现 | 中等 | 框架 | 路由、History |
| 018 | CSS 布局题 | 简单 | CSS | Flex、Grid |
| 019 | 事件委托 | 简单 | DOM | 事件、性能 |
| 020 | 懒加载实现 | 中等 | 性能 | 图片、IntersectionObserver |

---

### 12. 开发优先级

**第一阶段（MVP）**：
- ✅ 题目列表页 + 筛选功能
- ✅ 题目详情页基础布局
- ✅ 代码编辑器集成
- ✅ 5-10 道精选题目

**第二阶段**：
- ✅ 测试用例运行器
- ✅ 状态管理（已解决/未解决）
- ✅ 题解显示功能
- ✅ 增加至 20 道题目

**第三阶段**：
- ✅ 讨论区功能
- ✅ 收藏功能
- ✅ 刷题统计
- ✅ 更多题目（50+）

---

### 13. 测试用例

```typescript
// src/pages/Practice/__tests__/PracticePage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PracticePage from '../index';

describe('PracticePage', () => {
  test('renders practice page with title', () => {
    render(<PracticePage />);
    expect(screen.getByText('前端刷题练习')).toBeInTheDocument();
  });

  test('can filter by difficulty', () => {
    render(<PracticePage />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'easy' } });
    expect(select).toHaveValue('easy');
  });

  test('displays problem cards', () => {
    render(<PracticePage />);
    const cards = screen.getAllByRole('button');
    expect(cards.length).toBeGreaterThan(0);
  });
});
```

---

### 14. 部署与优化

1. **性能优化**：
   - 代码编辑器按需加载
   - 题目数据静态化
   - 使用 React.memo 优化渲染

2. **SEO 优化**：
   - 每道题目独立路由
   - 添加 meta 标签
   - 生成 sitemap

3. **PWA 支持**：
   - 离线访问题目
   - 代码本地保存

---

这个方案保持了你现有博客的 UI 风格，采用暗色系设计，与代码编辑器功能无缝集成。你想先从哪个部分开始实现？我可以帮你逐步完成代码编写！🚀