'use client';

import NewCommentInput from '@/app/lessonDetail/[id]/_component/commentSection/CommentInput';
import CommentList from '@/app/lessonDetail/[id]/_component/commentSection/CommentList';
import { useComments } from '@/app/lessonDetail/_lib/useComments';

const LogCommentSection = ({
  postId,
  accessToken,
}: {
  postId: number;
  accessToken: string;
}) => {
  const {
    comments,
    addComment,
    deleteComment,
    likeComment,
    toggleReplies,
    showReplies,
    putComment,
  } = useComments(postId, accessToken);

  return (
    <div className={'p-2'}>
      <CommentList
        comments={comments?.data}
        onLike={likeComment}
        toggleReplies={toggleReplies}
        showReplies={showReplies}
        onAddReply={addComment}
        onDeleteComment={deleteComment}
        onEditComment={putComment}
      />
      <NewCommentInput onAddComment={addComment} />
    </div>
  );
};

export default LogCommentSection;
