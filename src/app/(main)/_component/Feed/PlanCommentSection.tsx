import React from 'react';
import IComment from '@/types/comment';
import formatRelativeTime from '../../_lib/formatRelativeTime';

interface CommentProps {
  comments: IComment[];
}

const PlanCommentSection = ({ comments }: CommentProps) => {
  return (
    <div className={'px-4 py-2'}>
      {comments.length > 0 &&
        comments.map((comment) => (
          <div
            key={comment.id}
            className={'mt-2 p-2 bg-slate-100 rounded-lg shadow'}
          >
            <div className={'flex items-center space-x-3'}>
              <div
                className={'w-8 h-8 rounded-full'}
                style={{
                  backgroundImage: `url(${comment.authorThumbnailImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div>
                <div className={'flex items-center'}>
                  <strong>{comment.authorNickname}</strong>
                  <div className={'text-slate-500 text-xs ml-2'}>
                    {formatRelativeTime(comment.createdAt)}
                  </div>
                </div>
                <div className={'text-slate-600 text-sm'}>
                  {comment.content}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlanCommentSection;
