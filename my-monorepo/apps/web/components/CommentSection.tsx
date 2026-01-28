import { useState } from 'react';
import type { FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Separator from '@radix-ui/react-separator';
import type { Comment } from '../lib/types';
import { createComment } from '../lib/api';
import { Button } from './ui/Button';
import { cn } from '../lib/cn';

export function CommentSection({ postId, initialComments }: { postId: string; initialComments: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!author.trim() || !content.trim()) {
      setError('请填写昵称和评论内容。');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const newComment = await createComment(postId, { author, content });
      setComments((prev) => [newComment, ...prev]);
      setAuthor('');
      setContent('');
      setOpen(false);
    } catch {
      setError('提交失败，请稍后再试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-8 max-w-3xl mx-auto pb-20">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
            评论区
            <span className="text-sm font-normal text-[var(--color-muted)] bg-[var(--color-surface-2)] px-2 py-0.5 rounded-full">
              {comments.length}
            </span>
          </h3>
          <p className="text-sm text-[var(--color-muted)]">自由讨论你的想法，分享你的实践。</p>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button>写评论</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl">
              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <Dialog.Title className="text-xl font-bold leading-none tracking-tight text-[var(--color-text)]">发表你的观点</Dialog.Title>
                <Dialog.Description className="text-sm text-[var(--color-muted)]">
                  评论会公开展示，请保持友善与清晰。
                </Dialog.Description>
              </div>
              <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <input
                    className="flex h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2 text-sm ring-offset-[var(--color-surface)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:border-transparent transition-all disabled:cursor-not-allowed disabled:opacity-50 text-[var(--color-text)]"
                    placeholder="你的昵称"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <textarea
                    className="flex min-h-[120px] w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3 text-sm ring-offset-[var(--color-surface)] placeholder:text-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:border-transparent transition-all disabled:cursor-not-allowed disabled:opacity-50 text-[var(--color-text)] resize-none"
                    rows={4}
                    placeholder="写下你的想法..."
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
                </div>
                {error ? <p className="text-sm font-medium text-red-500 bg-red-500/10 p-2 rounded-lg">{error}</p> : null}
                <Button type="submit" disabled={loading} className="w-full h-11">
                  {loading ? '提交中...' : '发布评论'}
                </Button>
              </form>
              <Dialog.Close asChild>
                <button 
                  className="absolute right-4 top-4 p-2 rounded-lg text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" 
                  aria-label="Close"
                >
                  <span className="text-xl leading-none block">×</span>
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      
      <Separator.Root className="h-px bg-[var(--color-border)] w-full" />
      
      <div className="flex flex-col gap-8">
        {comments.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center gap-2 text-[var(--color-muted)] bg-[var(--color-surface-2)]/50 rounded-2xl border border-[var(--color-border)] border-dashed">
             <div className="text-4xl mb-2">💬</div>
             <p className="font-medium">还没有评论</p>
             <p className="text-xs opacity-70">成为第一个发言的人吧</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
               <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] font-bold text-sm shadow-sm select-none">
                 {comment.author.slice(0, 1).toUpperCase()}
               </div>
               <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-semibold text-[var(--color-text)]">{comment.author}</strong>
                    <span className="text-xs text-[var(--color-muted)]">{comment.createdAt}</span>
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-sm leading-relaxed text-[var(--color-text)] shadow-sm group-hover:shadow-md transition-shadow">
                    <p className="whitespace-pre-wrap">{comment.content}</p>
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
