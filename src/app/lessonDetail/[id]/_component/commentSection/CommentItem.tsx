'use client';

import { useState } from 'react';
import IComment from '@/types/comment';
import LikeButton from './LikeButton';
import ReplyItem from './ReplyItem';

interface Props {
  comment: IComment;
  onLike: (id: number) => void;
  onToggleReplies: (id: number) => void;
  onAddReply: (id: number, replyText: string) => void;
}

const CommentItem = ({
  comment,
  onLike,
  onToggleReplies,
  onAddReply,
}: Props) => {
  const [replyText, setReplyText] = useState('');

  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(event.target.value);
  };

  const submitReply = () => {
    if (replyText.trim()) {
      onAddReply(comment.id, replyText);
      setReplyText('');
    }
  };

  return (
    <div className={'bg-gray-100 rounded-lg p-4 my-4'}>
      <p className={'text-sm font-semibold'}>{comment.author}</p>
      <p className={'text-sm'}>{comment.text}</p>
      <div className={'flex items-center space-x-4'}>
        <LikeButton count={comment.likes} onLike={() => onLike(comment.id)} />
        <button
          type={'button'}
          onClick={() => onToggleReplies(comment.id)}
          className={'text-blue-600 hover:text-blue-800'}
        >
          {comment.showReplies ? '답글 숨기기' : '답글 보기'}
        </button>
      </div>

      {comment.showReplies && (
        <>
          {comment.replies && comment.replies.length > 0 && (
            <div className={'ml-6 mt-2 bg-gray-200 rounded-lg p-2'}>
              {comment.replies.map((reply) => (
                <ReplyItem key={reply.id} reply={reply} />
              ))}
            </div>
          )}

          <div className={'flex mt-4'}>
            <input
              type={'text'}
              className={
                'shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              }
              placeholder={'답글'}
              value={replyText}
              onChange={handleReplyChange}
            />
            <button
              type={'button'}
              className={`bg-purple-500 hover:bg-purple-700 text-white text-sm whitespace-nowrap py-2 px-4 rounded ml-2 ${
                replyText.trim() ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={submitReply}
              disabled={!replyText.trim()}
            >
              {'등록'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentItem;
