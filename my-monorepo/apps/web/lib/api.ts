import type { Author, Comment, PostDetail, PostSummary } from './types';

const normalizeApiBase = () => {
  const envUrl = (process.env.NEXT_PUBLIC_API_URL || '').trim();
  if (envUrl) return envUrl.replace(/\/$/, '');
  // if (process.env.NODE_ENV === 'development') return 'http://localhost:4001/api';
  return '/api';
};

const apiBase = normalizeApiBase();

export async function fetchAuthor(id: string): Promise<Author> {
  const res = await fetch(`${apiBase}/author/${id}`);
  if (!res.ok) throw new Error('Failed to load author');
  return (await res.json()) as Author;
}

export async function fetchTags(): Promise<{ id: number; name: string }[]> {
  const res = await fetch(`${apiBase}/tags`);
  if (!res.ok) throw new Error('Failed to load tags');
  return (await res.json()) as { id: number; name: string }[];
}

export async function fetchPosts(label?: string): Promise<PostSummary[]> {
  const url = label ? `${apiBase}/posts?label=${encodeURIComponent(label)}` : `${apiBase}/posts`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load posts');
  return (await res.json()) as PostSummary[];
}

export async function fetchPostById(id: string): Promise<PostDetail | null> {
  const res = await fetch(`${apiBase}/posts/${id}`);
  if (!res.ok) throw new Error('Failed to load post');
  return (await res.json()) as PostDetail;
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  const res = await fetch(`${apiBase}/posts/${postId}/comments`);
  if (!res.ok) throw new Error('Failed to load comments');
  return (await res.json()) as Comment[];
}

export async function createComment(postId: string, payload: { author: string; content: string }) {
  const res = await fetch(`${apiBase}/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create comment');
  return (await res.json()) as Comment;
}
