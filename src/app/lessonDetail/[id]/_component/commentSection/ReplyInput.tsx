import React, { useState } from 'react';

interface ReplyInputProps {
  onAddReply: (commentData: {
    content: string;
    parentCommentId: number;
  }) => void;
  onCancel?: () => void;
  parentCommentId: number;
  initialText?: string;
}

const ReplyInput = ({
  onAddReply,
  parentCommentId,
  initialText,
  onCancel,
}: ReplyInputProps) => {
  const [replyText, setReplyText] = useState<string>(initialText || '');

  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(event.target.value);
  };

  const submitReply = () => {
    if (replyText.trim()) {
      onAddReply({ content: replyText, parentCommentId });
      setReplyText('');
    }
  };

  return (
    <div className={'flex mt-4 mb-2'}>
      <input
        type={'text'}
        className={
          'shadow border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline'
        }
        placeholder={initialText ? '' : '답글'}
        value={replyText}
        onChange={handleReplyChange}
      />
      <button
        type={'button'}
        className={
          'bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded ml-2 w-16'
        }
        onClick={submitReply}
        disabled={!replyText.trim()}
      >
        {'등록'}
      </button>
      {initialText && (
        <button
          type={'button'}
          className={
            'bg-gray-500 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded ml-2 w-16'
          }
          onClick={onCancel}
        >
          {'취소'}
        </button>
      )}
    </div>
  );
};

export default ReplyInput;
