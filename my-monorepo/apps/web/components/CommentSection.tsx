import { useState } from 'react';
import type { FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Separator from '@radix-ui/react-separator';
import type { Comment } from '../lib/types';
import { createComment } from '../lib/api';
import { Button } from './ui/Button';

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
    <section className="comment-section">
      <div className="comment-header">
        <div>
          <h3>评论区</h3>
          <p>自由讨论你的想法，分享你的实践。</p>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button>写评论</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="dialog-content">
              <Dialog.Title className="dialog-title">发表你的观点</Dialog.Title>
              <Dialog.Description className="dialog-description">
                评论会公开展示，请保持友善与清晰。
              </Dialog.Description>
              <form className="dialog-form" onSubmit={handleSubmit}>
                <input
                  className="input"
                  placeholder="你的昵称"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                />
                <textarea
                  className="textarea"
                  rows={4}
                  placeholder="写下你的想法..."
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
                {error ? <p className="form-error">{error}</p> : null}
                <Button type="submit" disabled={loading}>
                  {loading ? '提交中...' : '发布评论'}
                </Button>
              </form>
              <Dialog.Close asChild>
                <button className="icon-button" aria-label="Close">
                  ×
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <Separator.Root className="separator" />
      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="empty">还没有评论，成为第一个发言的人。</div>
        ) : (
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="comment-meta">
                <strong>{comment.author}</strong>
                <span>{comment.createdAt}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
