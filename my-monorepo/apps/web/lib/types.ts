export type Author = {
  name: string;
  title: string;
  avatarUrl?: string;
  bio: string;
  stats: {
    posts: number;
    followers: number;
    readingHours: number;
    weeklyCompletion?: number;
  };
  links: {
    label: string;
    href: string;
  }[];
};

export type PostSummary = {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  coverColor: string;
  author: Author;
  commentCount: number;
};

export type PostDetail = PostSummary & {
  content: string;
};

export type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};
