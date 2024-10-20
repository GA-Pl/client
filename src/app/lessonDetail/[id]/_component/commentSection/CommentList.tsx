'use client';

import IComment from '@/types/comment';
import CommentItem from './CommentItem';

interface Props {
  comments: IComment[];
  onLike: (id: number) => void;
  onToggleReplies: (id: number) => void;
  onAddReply: (id: number, replyText: string) => void;
}

const CommentList = ({
  comments,
  onLike,
  onToggleReplies,
  onAddReply,
}: Props) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onLike={onLike}
          onToggleReplies={onToggleReplies}
          onAddReply={onAddReply}
        />
      ))}
    </div>
  );
};

export default CommentList;
