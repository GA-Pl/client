'use client';

import { useState } from 'react';
import IComment from '@/types/comment';
import CommentList from './CommentList';
import NewCommentInput from './CommentInput';

const CommentSection = () => {
  const [comments, setComments] = useState<IComment[]>([
    {
      id: 1,
      author: '오리쌤',
      text: '아주 흥미로운 글입니다!!',
      likes: 0,
      replies: [],
      showReplies: false,
    },
    {
      id: 2,
      author: '토끼쌤',
      text: '이런 방법도 있었군요! 알려주셔서 감사합니다!~',
      likes: 0,
      replies: [],
      showReplies: false,
    },
  ]);

  const handleAddComment = (text: string) => {
    const newComment: IComment = {
      id: comments.length + 1,
      author: 'Anonymous',
      text,
      likes: 0,
      replies: [],
      showReplies: false,
    };
    setComments([...comments, newComment]);
  };

  const handleToggleReplies = (id: number) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, showReplies: !comment.showReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleAddReply = (commentId: number, replyText: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const newReply: IComment = {
          id: (comment.replies?.length || 0) + 1,
          author: 'Anonymous',
          text: replyText,
          likes: 0,
          replies: [],
          showReplies: true,
        };
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleLike = (id: number) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        const newLikes = comment.isLiked
          ? comment.likes - 1
          : comment.likes + 1;
        return { ...comment, likes: newLikes, isLiked: !comment.isLiked };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div className={'bg-white shadow-md rounded-lg p-4'}>
      <h3 className={'text-lg font-semibold mb-4'}>{'댓글'}</h3>
      <CommentList
        comments={comments}
        onLike={handleLike}
        onToggleReplies={handleToggleReplies}
        onAddReply={handleAddReply}
      />
      <NewCommentInput onAddComment={handleAddComment} />
    </div>
  );
};

export default CommentSection;
