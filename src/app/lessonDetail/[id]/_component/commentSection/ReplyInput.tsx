'use client';

import { useState } from 'react';

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
  const maxLength = 255;

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
    <div className={'flex flex-col mt-4 mb-2'}>
      <div className={'text-sm text-gray-500'}>
        {replyText.length}
        {'/'}
        {maxLength}
        {replyText.length > maxLength && (
          <span className={'text-red-500 ml-2'}>
            {'255자를 초과할 수 없습니다.'}
          </span>
        )}
      </div>

      <div className={'flex items-center mt-2'}>
        <input
          type={'text'}
          className={
            'shadow border rounded-l w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline rounded'
          }
          placeholder={initialText ? '' : '답글'}
          value={replyText}
          onChange={handleReplyChange}
          maxLength={maxLength}
        />
        <button
          type={'button'}
          className={
            'bg-blue-500 hover:bg-blue-700 text-white text-xs whitespace-nowrap py-2 px-4 rounded'
          }
          onClick={submitReply}
          disabled={!replyText.trim() || replyText.length > maxLength}
        >
          {'등록'}
        </button>
      </div>
      {initialText && (
        <button
          type={'button'}
          className={
            'bg-gray-500 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded mt-2 w-16 self-end'
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
