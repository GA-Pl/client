'use client';

import IComment from '@/types/comment';

interface ReplyItemProps {
  reply: IComment;
}

const ReplyItem = ({ reply }: ReplyItemProps) => {
  return (
    <div className={'bg-gray-100 p-2 my-2 rounded-lg'}>
      <p className={'text-sm font-semibold'}>{reply.author}</p>
      <p className={'text-sm'}>{reply.text}</p>
    </div>
  );
};

export default ReplyItem;
