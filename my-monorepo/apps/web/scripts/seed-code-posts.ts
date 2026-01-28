
import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not defined in .env');
  process.exit(1);
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

const CODE_POSTS = [
  {
    title: '精通 React Hooks：自定义 Hook 实战指南',
    excerpt: '如何封装复杂的业务逻辑？本文通过三个实际案例（useDebounce, useLocalStorage, useFetch）带你掌握自定义 Hook 的精髓。',
    content: `
Hooks 是 React 16.8 引入的革命性特性。它让我们在不编写 Class Component 的情况下使用 State 和其他 React 特性。

### 1. useLocalStorage

这是一个非常实用的 Hook，用于在 LocalStorage 中持久化状态。

\`\`\`typescript:hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // 获取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // 监听变化并更新 LocalStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
\`\`\`

使用方法非常简单：

\`\`\`tsx
const [name, setName] = useLocalStorage('name', 'Bob');
\`\`\`

### 2. useDebounce

在处理搜索输入等高频事件时，防抖（Debounce）是必不可少的。

\`\`\`typescript:hooks/useDebounce.ts
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
\`\`\`
    `,
    tags: ['React', 'TypeScript', 'Frontend', 'Hooks'],
    reading_time: '12 分钟阅读',
    cover_color: 'bg-blue-600',
    author_id: 1,
  },
  {
    title: 'Rust 所有权系统解析：内存安全的基石',
    excerpt: '所有权（Ownership）是 Rust 最独特的特性。它让 Rust 无需垃圾回收（GC）即可保证内存安全。',
    content: `
Rust 的核心特性就是**所有权**。虽然这个概念在其他语言中也有，但 Rust 将其编码到了语言核心中。

### 所有权规则

1. Rust 中的每一个值都有一个被称为其 **所有者**（owner）的变量。
2. 值在任一时刻有且只有一个所有者。
3. 当所有者（变量）离开作用域，这个值将被丢弃。

### 变量作用域

\`\`\`rust:src/main.rs
fn main() {
    {                      // s 在这里无效, 它尚未声明
        let s = "hello";   // 从此处起，s 是有效的

        // 使用 s
        println!("{}", s);
    }                      // 此作用域已结束，s 不再有效
}
\`\`\`

### 移动（Move）与克隆（Clone）

在 Rust 中，对于堆上数据，赋值操作默认是移动，而不是浅拷贝。

\`\`\`rust
let s1 = String::from("hello");
let s2 = s1;

// println!("{}, world!", s1); // 错误！s1 已经无效了
println!("{}, world!", s2); // 正确
\`\`\`

如果你确实需要深度复制 String 堆上的数据，可以使用 \`clone\` 方法：

\`\`\`rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {}, s2 = {}", s1, s2);
\`\`\`

### 引用与借用

\`\`\`rust:src/lib.rs
fn calculate_length(s: &String) -> usize { // s 是对 String 的引用
    s.len()
} // 这里，s 离开了作用域。但因为它并不拥有引用值的所有权，
  // 所以什么也不会发生
\`\`\`
    `,
    tags: ['Rust', 'Systems Programming', 'Backend'],
    reading_time: '20 分钟阅读',
    cover_color: 'bg-orange-600',
    author_id: 1,
  },
  {
    title: 'Python 数据分析入门：Pandas 实战',
    excerpt: '从 CSV 读取到数据清洗、透视表。Pandas 是 Python 数据科学领域的核心库。',
    content: `
Pandas 是 Python 中最强大的数据处理库之一。它提供了 DataFrame 结构，让数据操作变得像 SQL 一样简单。

### 1. 读取数据

\`\`\`python:analysis.py
import pandas as pd

# 读取 CSV 文件
df = pd.read_csv('data.csv')

# 查看前 5 行
print(df.head())

# 查看数据概览
print(df.info())
\`\`\`

### 2. 数据清洗

处理缺失值是数据分析的第一步。

\`\`\`python
# 删除包含缺失值的行
df_clean = df.dropna()

# 或者填充缺失值
df_filled = df.fillna(0)

# 重命名列
df = df.rename(columns={'old_name': 'new_name'})
\`\`\`

### 3. 数据聚合

\`\`\`python
# 按部门分组并计算平均薪资
salary_by_dept = df.groupby('Department')['Salary'].mean()

print(salary_by_dept)
\`\`\`
    `,
    tags: ['Python', 'Data Science', 'Pandas'],
    reading_time: '15 分钟阅读',
    cover_color: 'bg-yellow-600',
    author_id: 1,
  },
    {
    title: 'Go 语言并发编程：Goroutines 与 Channels',
    excerpt: 'Go 语言的并发模型基于 CSP。了解 Goroutine 和 Channel 如何让并发编程变得简单而高效。',
    content: `
Go 语言被设计为一门系统级语言，并发支持是其核心特性之一。

### Goroutines

Goroutine 是 Go 运行时管理的轻量级线程。

\`\`\`go:main.go
package main

import (
	"fmt"
	"time"
)

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world") // 开启一个新的 Goroutine
	say("hello")    // 在当前 Goroutine 执行
}
\`\`\`

### Channels

Channel 是 Goroutine 之间通信的管道。

\`\`\`go:channel.go
package main

import "fmt"

func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // 将和发送到 channel c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)

	x, y := <-c, <-c // 从 channel c 接收

	fmt.Println(x, y, x+y)
}
\`\`\`
    `,
    tags: ['Go', 'Backend', 'Concurrency'],
    reading_time: '10 分钟阅读',
    cover_color: 'bg-cyan-600',
    author_id: 1,
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Connected to database');
    
    // Ensure author exists
    const authorRes = await client.query('SELECT id FROM authors WHERE id = 1');
    if (authorRes.rows.length === 0) {
       console.log('Creating default author...');
       await client.query(`
        INSERT INTO authors (id, name, title, bio, article_count, follower_count, total_reads, weekly_completion_rate)
        VALUES (1, '林知夏', '产品设计师 / 写作者', '关注体验与效率的交汇点...', 0, 0, 0, 0)
      `);
    }

    console.log('Inserting code posts...');
    for (const post of CODE_POSTS) {
      await client.query(`
        INSERT INTO posts (title, excerpt, content, tags, published_at, reading_time, cover_color, author_id)
        VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7)
      `, [post.title, post.excerpt, post.content, post.tags, post.reading_time, post.cover_color, post.author_id]);
    }
    
    console.log(`Successfully inserted ${CODE_POSTS.length} code posts.`);
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
