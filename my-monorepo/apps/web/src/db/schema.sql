CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  avatar_url TEXT,
  article_count INTEGER DEFAULT 0,
  follower_count INTEGER DEFAULT 0,
  total_reads INTEGER DEFAULT 0,
  weekly_completion_rate INTEGER DEFAULT 0,
  social_links JSONB DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  tags TEXT[],
  published_at DATE,
  reading_time TEXT,
  cover_color TEXT,
  author_name TEXT,
  author_title TEXT,
  author_bio TEXT,
  author_id INTEGER REFERENCES authors(id)
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
