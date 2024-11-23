import IComment from '@/types/comment';
import CommentItem from './CommentItem';

interface Props {
  comments: IComment[];
  onLike: (id: number) => void;
  toggleReplies: (id: number) => void;
  onAddReply: (commentData: {
    content: string;
    parentCommentId?: number;
  }) => void;
  onDeleteComment: (commentId: number) => void;
  onEditComment: (commentData: { commentId: number; content: string }) => void;
  showReplies: Record<number, boolean>;
}

const CommentList = ({
  comments,
  onLike,
  toggleReplies,
  showReplies,
  onAddReply,
  onDeleteComment,
  onEditComment,
}: Props) => {
  const topLevelComments = comments?.filter((c) => !c.parentCommentId);

  return (
    <div>
      {topLevelComments?.length > 0 ? (
        topLevelComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={comments.filter((c) => c.parentCommentId === comment.id)}
            onLike={onLike}
            isLiked={comment.isLiked}
            likeCount={comment.likedCount}
            toggleReplies={toggleReplies}
            showReplies={showReplies[comment.id]}
            onAddReply={onAddReply}
            onDeleteComment={onDeleteComment}
            onEditComment={onEditComment}
          />
        ))
      ) : (
        <div className={'text-slate-400'}>{'댓글이 존재하지 않습니다'}</div>
      )}
    </div>
  );
};

export default CommentList;
