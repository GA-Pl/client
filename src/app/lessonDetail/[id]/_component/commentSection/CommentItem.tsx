'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import IComment from '@/types/comment';
import formatRelativeTime from '@/app/(main)/_lib/formatRelativeTime';
import LikeButton from './LikeButton';
import ReplyItem from './ReplyItem';
import ReplyInput from './ReplyInput';

interface Props {
  comment: IComment;
  replies: IComment[];
  onLike: (id: number) => void;
  isLiked: boolean;
  likeCount: number;
  toggleReplies: (id: number) => void;
  showReplies: boolean;
  onAddReply: (commentData: {
    content: string;
    parentCommentId: number;
  }) => void;
  onDeleteComment?: (id: number) => void;
  onEditComment?: (commentData: { content: string; commentId: number }) => void;
}

const CommentItem = ({
  comment,
  replies,
  onLike,
  isLiked,
  likeCount,
  toggleReplies,
  showReplies,
  onAddReply,
  onDeleteComment,
  onEditComment,
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const editedText = comment.content;
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleEdit = () => {
    setEditMode(true);
    setIsDropdownOpen(false);
  };

  const handleDelete = () => {
    onDeleteComment?.(comment.id);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  return (
    <div ref={dropdownRef} className={'bg-slate-100 rounded-lg p-4 my-4'}>
      <div className={'flex items-center space-x-4 justify-between'}>
        <div className={'flex'}>
          {comment.authorThumbnailImage && (
            <Image
              width={100}
              height={100}
              src={comment.authorThumbnailImage}
              alt={comment.authorNickname}
              className={
                'w-10 h-10 rounded-full object-cover border-2 border-white shadow-md'
              }
            />
          )}
          <div className={'mx-4'}>
            <p className={'text-sm font-semibold'}>{comment.authorNickname}</p>
            <p className={'text-xs text-slate-400'}>
              {formatRelativeTime(comment.createdAt)}
            </p>
          </div>
        </div>

        {comment.isMyComment && (
          <button
            type={'button'}
            onClick={toggleDropdown}
            className={
              'ml-auto text-slate-400 hover:text-red-700 py-2 px-4 rounded relative'
            }
          >
            {'...'}
          </button>
        )}

        {isDropdownOpen && (
          <div
            className={
              'absolute mt-24 right-8 desktop:right-36 desktop:left-auto 400px:left-64 w-20 bg-white rounded-md shadow-xl z-20'
            }
          >
            <ul>
              <li>
                <button
                  type={'button'}
                  onClick={handleEdit}
                  className={
                    'block px-4 py-2 text-sm text-slate-700 hover:bg-slate-700 hover:text-white w-full rounded-md'
                  }
                >
                  {'수정'}
                </button>
              </li>
              <li>
                <button
                  type={'button'}
                  onClick={handleDelete}
                  className={
                    'block px-4 py-2 text-sm text-slate-700 hover:bg-slate-700 hover:text-white w-full rounded-md'
                  }
                >
                  {'삭제'}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {editMode ? (
        <ReplyInput
          onAddReply={(data) => {
            onEditComment?.({ content: data.content, commentId: comment.id });
            setEditMode(false);
          }}
          parentCommentId={comment.id}
          initialText={editedText}
          onCancel={handleCancelEdit}
        />
      ) : (
        <p className={'my-2'}>{comment.content}</p>
      )}
      <div className={'flex items-center space-x-4'}>
        <LikeButton
          isLiked={isLiked}
          count={likeCount}
          onLike={() => onLike(comment.id)}
        />
        <button
          type={'button'}
          onClick={() => toggleReplies(comment.id)}
          className={'text-blue-400 hover:text-blue-600 text-sm'}
        >
          {showReplies ? '답글 숨기기' : '답글 보기'}
        </button>
      </div>

      {showReplies && (
        <>
          {replies.length > 0 && (
            <div className={'ml-6 mt-1 p-2'}>
              {replies.map((reply) => (
                <ReplyItem
                  key={reply.id}
                  reply={reply}
                  onDeleteComment={onDeleteComment}
                />
              ))}
            </div>
          )}
          <ReplyInput onAddReply={onAddReply} parentCommentId={comment.id} />
        </>
      )}
    </div>
  );
};

export default CommentItem;
