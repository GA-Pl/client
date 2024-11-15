import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getComments } from './getComments';
import postComment from './postComment';
import deleteComment from './deleteComment';
import putComment from './putComment';
import { postCommentLike } from './postCommentLike';

type CommentData = {
  content: string;
  parentCommentId?: number;
};

export function useComments(documentId: number, accessToken: string) {
  const queryClient = useQueryClient();
  const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});

  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery(['comments', documentId], () =>
    getComments(documentId, accessToken),
  );

  const toggleReplies = (commentId: number) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const addCommentMutation = useMutation(
    (commentData: CommentData) =>
      postComment(commentData, documentId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', documentId]);
      },
    },
  );

  const deleteCommentMutation = useMutation(
    (commentId: number) => deleteComment(commentId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', documentId]);
      },
    },
  );

  const putCommentMutation = useMutation(
    ({ commentId, content }: { commentId: number; content: string }) =>
      putComment({ content }, commentId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', documentId]);
      },
    },
  );

  const likeCommentMutation = useMutation(
    (commentId: number) => postCommentLike(commentId.toString(), accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', documentId]);
      },
    },
  );

  return {
    comments,
    addComment: addCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
    putComment: putCommentMutation.mutate,
    likeComment: likeCommentMutation.mutate,
    toggleReplies,
    isLoading,
    isError,
    error,
    showReplies,
  };
}
