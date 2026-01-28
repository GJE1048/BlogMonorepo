# 博客系统 UI 升级与代码文章体验优化开发文档

## 一、设计目标与原则

### 1.1 核心体验升级点

| 体验维度 | 当前痛点 | 升级方案 | 参考系统 |
| :--- | :--- | :--- | :--- |
| **内容层次** | 文字密集，缺乏呼吸感 | 卡片式布局 + 智能留白系统 | Notion, Linear |
| **代码可读性** | 无语法高亮/行号/复制功能 | 专业级代码块组件 (文件名、复制、折叠) | GitHub, Dev.to |
| **沉浸阅读** | 无阅读进度/字体调节 | 阅读模式 + 字体缩放控件 | Medium, Readwise |
| **暗色模式** | 仅基础切换 | 智能色彩系统（自动适配代码主题） | VS Code, Obsidian |

### 1.2 技术约束

*   ✅ 保留现有 Next.js 14 + App Router (Pages Router 兼容) 架构
*   ✅ 兼容 Vercel Edge Runtime（无 Node.js 依赖）
*   ✅ 保持 Lighthouse 性能评分 >90
*   ✅ 无障碍访问 (WCAG 2.1 AA)

---

## 二、组件系统设计（libs/ui 扩展）

### 2.1 目录结构

```
apps/web/components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Badge.tsx
├── code/
│   ├── CodeBlock.tsx       # 核心代码块组件
│   └── CopyButton.tsx      # 复制代码按钮
├── article/
│   ├── ArticleCard.tsx     # 智能文章卡片
│   └── ArticleLayout.tsx   # 文章详情布局
└── MarkdownRenderer.tsx    # Markdown 渲染入口
```

### 2.2 关键组件实现

#### 📌 CodeBlock - 专业级代码展示组件

功能特性：
*   支持文件名显示 (e.g. `apps/web/server.ts`)
*   语法高亮 (Prism.js / Shiki)
*   行号显示
*   一键复制
*   长代码折叠
*   Mac 风格窗口控制点

#### 📌 ArticleCard - 智能文章卡片

功能特性：
*   区分普通文章与技术文章（技术文章显示编程语言标签）
*   封面图/色块自适应
*   悬停交互效果 (Hover Lift & Shadow)
*   元信息展示 (阅读时间、发布日期)

---

## 三、全局样式系统

### 3.1 智能留白系统

使用 Tailwind CSS 的 spacing scale 建立统一的韵律：
*   `gap-4` (1rem): 组件内间距
*   `gap-8` (2rem): 区块间距
*   `py-12` / `py-20`: 页面分区间距

### 3.2 暗色模式智能适配

确保代码块主题随系统/用户主题切换。
*   Light Mode: GitHub Light / Vercel Light
*   Dark Mode: VS Code Dark Plus / One Dark

---

## 四、页面集成方案

### 4.1 文章列表页 (pages/index.tsx)

使用 `ArticleCard` 替换旧的 `PostCard`，并采用响应式 Grid 布局。

### 4.2 文章详情页 (pages/posts/[id].tsx)

集成 `MarkdownRenderer`，并优化排版：
*   增加 `prose-lg` 提升正文阅读体验
*   图片自动圆角与阴影
*   链接悬停样式优化

---

## 五、Markdown 集成方案

### 5.1 代码文章写作规范

在 Markdown 代码块中通过元数据指定文件名：

    ```typescript title="lib/api.ts"
    export function fetchPosts() { ... }
    ```

### 5.2 解析实现

在 `MarkdownRenderer` 中解析 `className` 或 `node.meta` 获取文件名并传递给 `CodeBlock` 组件。

---

## 六、性能优化策略

| 优化点 | 方案 | 预期收益 |
| :--- | :--- | :--- |
| **代码高亮** | 按需加载语言包 (Async Import) | 减少 JS 体积 |
| **图片懒加载** | `loading="lazy"` | LCP 提升 |
| **字体优化** | 使用 System Fonts 或 Next/Font | 减少 FOUT |
