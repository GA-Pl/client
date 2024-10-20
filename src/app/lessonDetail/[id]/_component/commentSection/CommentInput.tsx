'use client';

import { useState } from 'react';

interface Props {
  onAddComment: (text: string) => void;
}

const NewCommentInput = ({ onAddComment }: Props) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const submitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className={'flex mt-4'}>
      <input
        type={'text'}
        className={
          'shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        }
        placeholder={'Add a comment...'}
        value={newComment}
        onChange={handleCommentChange}
      />
      <button
        type={'button'}
        className={`bg-primary800 hover:bg-primary text-white py-2 px-4 rounded ml-2 whitespace-nowrap ${
          newComment.trim() ? '' : 'opacity-50 cursor-not-allowed'
        }`}
        onClick={submitComment}
        disabled={!newComment.trim()}
      >
        {'댓글'}
      </button>
    </div>
  );
};

export default NewCommentInput;
