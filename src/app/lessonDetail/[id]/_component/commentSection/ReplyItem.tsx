import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import IComment from '@/types/comment';
import formatRelativeTime from '@/app/(main)/_lib/formatRelativeTime';
import ReplyInput from './ReplyInput';

interface ReplyItemProps {
  reply: IComment;
  onEditComment?: (commentData: { content: string; commentId: number }) => void;
  onDeleteComment?: (id: number) => void;
}

const ReplyItem = ({
  reply,
  onEditComment,
  onDeleteComment,
}: ReplyItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleEdit = () => {
    setEditMode(true);
    setIsDropdownOpen(false);
  };

  const handleDelete = () => {
    onDeleteComment?.(reply.id);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
    <div
      ref={dropdownRef}
      className={'px-3 pt-3 pb-1 mt-2 bg-slate-200 shadow-md rounded-md'}
    >
      <div className={'flex items-center space-x-4 justify-between'}>
        <div className={'flex'}>
          {reply.authorThumbnailImage && (
            <Image
              width={100}
              height={100}
              src={reply.authorThumbnailImage}
              alt={reply.authorNickname}
              className={
                'w-10 h-10 rounded-full object-cover border-2 border-white shadow-md'
              }
            />
          )}
          <div className={'mx-4'}>
            <p className={'text-sm font-semibold'}>{reply.authorNickname}</p>
            <p className={'text-xs text-slate-400'}>
              {formatRelativeTime(reply.createdAt)}
            </p>
          </div>
        </div>

        {reply.isMyComment && (
          <button
            type={'button'}
            onClick={toggleDropdown}
            className={
              'ml-auto text-slate-400 hover:text-red-700 py-2 px-4 rounded'
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
                    'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full'
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
                    'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full'
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
            onEditComment?.({ content: data.content, commentId: reply.id });
            setEditMode(false);
          }}
          onCancel={handleCancelEdit}
          parentCommentId={reply.id}
          initialText={reply.content}
        />
      ) : (
        <p className={'my-2'}>{reply.content}</p>
      )}
    </div>
  );
};

export default ReplyItem;
