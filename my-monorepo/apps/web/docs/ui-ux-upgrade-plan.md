# 博客 UI/UX 全面升级与体验优化方案

## 1. 设计愿景 (Design Vision)

打造一个**以内容为核心、设计为载体、技术为驱动**的现代化技术博客。借鉴 Vercel, Linear, Ghost 等业界顶尖产品的设计语言，追求极致的阅读体验与交互细节。

*   **极简主义 (Minimalism)**: 移除视觉噪音，让内容成为绝对主角。
*   **沉浸式阅读 (Immersive Reading)**: 精细打磨排版节奏，提供流畅的阅读心流。
*   **工程美学 (Engineering Aesthetics)**: 特别针对代码演示进行优化，体现技术博客的专业度。

## 2. 核心设计规范 (Design System)

### 2.1 排版系统 (Typography)
建立严格的字体层级，确保可读性与美感的平衡。

*   **字体栈 (Font Stack)**:
    *   英文: `Inter`, `SF Pro Display`, `-apple-system`.
    *   中文: `PingFang SC`, `Noto Sans SC` (避免使用宋体，保持现代感).
    *   代码: `JetBrains Mono`, `Fira Code` (支持连字特性).
*   **垂直韵律 (Vertical Rhythm)**:
    *   正文字号: `16px` (移动端) / `18px` (桌面端)。
    *   行高: `1.6` - `1.8`，增加行间呼吸感。
    *   段间距: `1.5em`，清晰区分段落。

### 2.2 色彩系统 (Color Palette)
采用语义化色彩管理，完美支持深色模式 (Dark Mode)。

*   **背景色**:
    *   Light: `#FFFFFF` (主), `#F9FAFB` (次).
    *   Dark: `#0A0A0A` (主), `#171717` (次).
*   **强调色 (Accent)**: 使用品牌色（如靛蓝或松石绿）点缀链接、按钮和关键交互。
*   **中性色**: 6-8 级灰度，用于文字（标题黑、正文灰、辅助灰）。

### 2.3 布局架构 (Layout)
*   **首页**: 采用 **Bento Grid (便当盒布局)** 或 **流式卡片布局**，打破传统列表的单调感，突出“精选”与“最新”的权重。
*   **文章页**: 
    *   **单栏布局**: 限制内容宽度在 `680px` - `720px` 之间，符合人类最佳阅读视线范围。
    *   **TOC (目录)**: 桌面端固定在右侧悬浮，移动端作为折叠面板。

## 3. 代码文章专项体验优化 (Code Experience)

针对技术博客的核心——代码阅读，进行深度定制。

### 3.1 渲染引擎升级
推荐使用 **Shiki** 或 **Prism.js** 实现构建时语法高亮，避免客户端闪烁 (FOUC) 并提升性能。

### 3.2 样式增强 (Visual Enhancement)
*   **Mac 风格窗口**: 代码块顶部增加红黄绿三色圆点，模拟终端窗口，增加精致感。
*   **语言标记**: 右上角清晰展示代码语言（如 `TypeScript`, `Rust`）。
*   **行号与高亮**: 
    *   支持行号显示。
    *   支持**特定行高亮**（Focus Lines），引导读者关注关键逻辑。
    *   支持**Diff 模式**，直观展示代码变更（新增/删除）。

### 3.3 交互功能 (Interactivity)
*   **一键复制**: 悬浮显示复制按钮，点击后提供触觉或视觉反馈（如 Checkmark 动画）。
*   **长代码折叠**: 超过一定高度的代码块自动折叠，避免阻断阅读流。

## 4. 组件化架构改造 (Component Architecture)

基于 React 组件精神，构建可复用、可组合的 UI 系统。

### 4.1 基础原子组件 (Atoms)
*   `Button`: 支持 `variant` (primary, secondary, ghost) 和 `size`。
*   `Tag`: 语义化标签，不同类别自动分配不同柔和背景色。
*   `Avatar`: 统一的头像组件，支持图片加载失败回退。

### 4.2 业务复合组件 (Molecules & Organisms)
*   `PostCard`: 包含封面图（支持图片懒加载/模糊占位）、标题、摘要、元信息（作者、时间、阅读时长）。增加 hover 时的轻微上浮与阴影加深效果。
*   `AuthorProfile`: 侧边栏作者信息卡片，集成动态统计数据可视化（如使用 SVG 绘制简单的趋势线）。
*   `CommentSection`: 评论区样式重构，采用嵌套式气泡设计，清晰展示回复层级。

## 5. 技术实施路线 (Implementation Roadmap)

### Phase 1: 样式基建 (Foundation)
1.  **引入 CSS 解决方案**: 推荐引入 **Tailwind CSS**，以获得原子类实用程序和一致的设计约束。或者继续优化 CSS Modules，建立 Design Tokens (CSS Variables)。
2.  **重构 Layout**: 实现响应式导航栏（移动端汉堡菜单）和 Footer。

### Phase 2: 核心页面重塑 (Core Pages)
1.  **首页重构**: 实现新的网格/卡片布局。
2.  **文章页重构**: 调整字体、行距，集成新的代码块样式。

### Phase 3: 交互增强 (Interaction)
1.  添加 **Framer Motion** 实现页面切换转场和平滑的元素显隐动画。
2.  实现代码块的一键复制与行高亮功能。
3.  优化图片加载体验（Blur-up 效果）。

## 6. 示例代码块样式设计 (Mockup)

```css
/* 伪代码示例：代码块容器 */
.code-block-container {
  border-radius: 12px;
  background: #1e1e1e; /* 深色背景 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 2rem 0;
}

/* 顶部栏 */
.code-header {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* 语法高亮区 */
.code-content {
  padding: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.7;
}
```
