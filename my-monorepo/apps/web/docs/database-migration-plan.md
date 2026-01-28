# 数据库扩展与全站数据动态化开发方案

## 1. 目标
将博客全站数据（文章、作者信息、统计数据、标签等）迁移至 Neon PostgreSQL 数据库，消除硬编码，实现数据的完全动态化管理。

## 2. 数据库设计 (Schema Design)

### 2.1 新增表结构

#### `authors` 表
用于存储作者的基本信息及统计数据。

| 字段名 | 类型 | 说明 | 示例 |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL PRIMARY KEY | 主键 | 1 |
| `name` | TEXT NOT NULL | 姓名 | 林知夏 |
| `title` | TEXT | 头衔 | 产品设计师 / 写作者 |
| `bio` | TEXT | 简介 | 关注体验与效率的交汇点... |
| `avatar_url` | TEXT | 头像链接 | (可选) |
| `article_count` | INTEGER | 文章数 | 128 |
| `follower_count` | INTEGER | 关注数 | 24650 |
| `total_reads` | INTEGER | 阅读量 | 1820 |
| `weekly_completion_rate` | INTEGER | 本周完成度(%) | 72 |
| `social_links` | JSONB | 社交链接 | `[{"label":"专栏","href":"..."}, ...]` |
| `created_at` | TIMESTAMPTZ | 创建时间 | DEFAULT NOW() |

#### `tags` 表
用于统一管理标签元数据。

| 字段名 | 类型 | 说明 | 示例 |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL PRIMARY KEY | 主键 | 1 |
| `name` | TEXT UNIQUE NOT NULL | 标签名 | 内容策略 |
| `created_at` | TIMESTAMPTZ | 创建时间 | DEFAULT NOW() |

### 2.2 修改现有表结构

#### `posts` 表
*   **新增** `author_id` (INTEGER) 外键，关联 `authors(id)`。
*   **保留** `tags` (TEXT[]) 数组字段，用于快速读取（也可以选择通过关联表，但为了兼容性先保留数组，同时维护 `tags` 表作为字典）。
*   **移除** (可选) `author_name`, `author_title`, `author_bio` 字段（数据迁移后不再使用）。

## 3. 数据迁移与初始化 (Seed Strategy)

在 `apps/web/src/db/seed.ts` 中实现：
1.  **创建表**：`authors`, `tags` (如果不存在)。
2.  **修改表**：检查 `posts` 表是否有 `author_id`，没有则添加。
3.  **预置数据**：
    *   插入默认作者“林知夏”及其统计数据。
    *   将现有文章的 `author_id` 更新为该作者 ID。
    *   扫描所有文章的 `tags`，去重后存入 `tags` 表。

## 4. API 开发计划

### 4.1 新增接口
*   `GET /api/author/:id` (或 `GET /api/site-info`): 获取作者详情、统计数据及社交链接。
*   `GET /api/tags`: 获取所有标签列表。

### 4.2 修改接口
*   `GET /api/posts`:
    *   支持 `JOIN authors` 查询，返回文章时带上作者简要信息（如头像、姓名）。
    *   或者前端单独获取作者信息，文章列表仅返回 `author_id`。鉴于目前设计，文章列表页通常也显示作者名，建议 JOIN 或在前端统一获取作者信息（如果是单人博客）。

## 5. 前端改造计划

*   **API Client (`src/lib/api.ts`)**:
    *   新增 `fetchAuthor(id)` 方法。
    *   新增 `fetchTags()` 方法。
*   **侧边栏组件 (`Sidebar` 或 `Layout`)**:
    *   移除硬编码的作者信息。
    *   使用 `useSWR` 或 `useEffect` 调用 `fetchAuthor` 获取数据并渲染。
    *   渲染统计数据（文章数、关注数等）。
    *   渲染社交链接。
