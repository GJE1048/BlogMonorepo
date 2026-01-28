import type { Comment, PostDetail, PostSummary } from './types';
import { sampleComments, samplePostDetails, samplePosts } from './sampleData';

const normalizeApiBase = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || '';
  if (!envUrl || envUrl.includes('http://localhost:4001/api')) {
    return 'http://localhost:4001/api';
  }
  return envUrl.replace(/\/$/, '');
};

const apiBase = normalizeApiBase();

export async function fetchPosts(): Promise<PostSummary[]> {
  try {
    const res = await fetch(`${apiBase}/posts`);
    if (!res.ok) throw new Error('Failed to load posts');
    return (await res.json()) as PostSummary[];
  } catch {
    return samplePosts;
  }
}

export async function fetchPostById(id: string): Promise<PostDetail | null> {
  try {
    const res = await fetch(`${apiBase}/posts/${id}`);
    if (!res.ok) throw new Error('Failed to load post');
    return (await res.json()) as PostDetail;
  } catch {
    return samplePostDetails[id] ?? null;
  }
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  try {
    const res = await fetch(`${apiBase}/posts/${postId}/comments`);
    if (!res.ok) throw new Error('Failed to load comments');
    return (await res.json()) as Comment[];
  } catch {
    return sampleComments[postId] ?? [];
  }
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
