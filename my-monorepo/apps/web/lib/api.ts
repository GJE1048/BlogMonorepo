import type { Author, Comment, PostDetail, PostSummary } from './types';

const normalizeApiBase = () => {
  const envUrl = (process.env.NEXT_PUBLIC_API_URL || '').trim();
  if (envUrl) return envUrl.replace(/\/$/, '');
  
  if (typeof window !== 'undefined') {
    return '/api';
  }
  
  const devHost = (process.env.NEXT_DEV_SERVER || '').trim();
  if (devHost) {
    return `${devHost.replace(/\/$/, '')}/api`;
  }
  
  if (process.env.NODE_ENV === 'development') {
    return 'https://www.040619.xyz/api';
  }
  
  const vercelUrl = (process.env.VERCEL_URL || '').trim();
  if (vercelUrl) {
    // Vercel deployment URL
    const protocol = vercelUrl.includes('localhost') ? 'http' : 'https';
    return `${protocol}://${vercelUrl}/api`;
  }
  
  const nextPublicUrl = (process.env.NEXT_PUBLIC_API_URL || '').trim();
  if (nextPublicUrl) {
    const protocol = nextPublicUrl.includes('localhost') ? 'http' : 'https';
    return `${protocol}://${nextPublicUrl.replace(/\/$/, '')}/api`;
  }
  
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

export async function ensureEgeneruiPost(): Promise<{ id: number }> {
  const res = await fetch(`${apiBase}/posts/ensure-egenerui`);
  if (!res.ok) throw new Error('Failed to ensure Egenerui post');
  return (await res.json()) as { id: number };
}

export async function ensureEgeneruiPost20(): Promise<{ id: number }> {
  const res = await fetch(`${apiBase}/posts/ensure-egenerui-20`);
  if (!res.ok) throw new Error('Failed to ensure Egenerui post (id=20)');
  return (await res.json()) as { id: number };
}

export async function ensureCoNotionPost21(): Promise<{ id: number }> {
  const res = await fetch(`${apiBase}/posts/ensure-co-notion-21`);
  if (!res.ok) throw new Error('Failed to ensure Co-Notion post (id=21)');
  return (await res.json()) as { id: number };
}
