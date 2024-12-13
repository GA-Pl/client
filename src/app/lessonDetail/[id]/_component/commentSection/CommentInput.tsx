'use client';

import { useState } from 'react';

interface Props {
  onAddComment: (commentData: { content: string }) => void;
}

const NewCommentInput = ({ onAddComment }: Props) => {
  const [newComment, setNewComment] = useState('');
  const maxLength = 255;

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const submitComment = () => {
    if (newComment.trim()) {
      onAddComment({ content: newComment });
      setNewComment('');
    }
  };

  return (
    <div className={'flex flex-col mt-4'}>
      <div className={'flex justify-between items-center mt-2 text-xs'}>
        <span
          className={`${
            newComment.length > maxLength ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          {newComment.length}
          {'/'}
          {maxLength}
        </span>
        {newComment.length > maxLength && (
          <span className={'text-red-500'}>
            {'255자를 초과할 수 없습니다.'}
          </span>
        )}
      </div>
      <div className={'flex justify-between items-center'}>
        <input
          type={'text'}
          className={
            'shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12'
          }
          placeholder={'댓글을 써주세요'}
          value={newComment}
          onChange={handleCommentChange}
          maxLength={maxLength}
        />
        <button
          type={'button'}
          className={`bg-primary800 hover:bg-primary text-white text-sm text-nowrap px-4 rounded h-12 ${
            newComment.trim() ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={submitComment}
          disabled={!newComment.trim() || newComment.length > maxLength}
        >
          {'댓글'}
        </button>
      </div>
    </div>
  );
};

export default NewCommentInput;
