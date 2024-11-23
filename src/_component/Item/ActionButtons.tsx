'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { submitBookmark, submitLike } from '@/app/(main)/_lib/submitButton';

interface ActionButtonsProps {
  like: number;
  comment: number;
  scrap: number;
  isLiked: boolean;
  isBookmarked: boolean;
  postId: number;
}

const ActionButtons = ({
  like,
  comment,
  scrap,
  isLiked: initialIsLiked,
  isBookmarked: initialIsBookmarked,
  postId,
}: ActionButtonsProps) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(like);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [bookmarks, setBookmarks] = useState(scrap);

  const handleLikeToggle = async () => {
    if (!accessToken) {
      toast.error('You must be logged in to like a post.');
      return;
    }

    const newIsLiked = !isLiked;
    const newLikes = newIsLiked ? likes + 1 : likes - 1;

    setIsLiked(newIsLiked);
    setLikes(newLikes);

    try {
      await submitLike(postId, accessToken);
    } catch (error: any) {
      setIsLiked(isLiked);
      setLikes(likes);
      toast.error(`Like action failed: ${error.message}. Please try again.`);
    }
  };

  const handleBookmarkToggle = async () => {
    if (!accessToken) {
      toast.error('You must be logged in to bookmark a post.');
      return;
    }

    const newIsBookmarked = !isBookmarked;
    const newBookmarks = newIsBookmarked ? bookmarks + 1 : bookmarks - 1;

    setIsBookmarked(newIsBookmarked);
    setBookmarks(newBookmarks);

    try {
      await submitBookmark(postId, accessToken);
    } catch (error: any) {
      setIsBookmarked(isBookmarked);
      setBookmarks(bookmarks);
      toast.error(
        `Bookmark action failed: ${error.message}. Please try again.`,
      );
    }
  };

  return (
    <div className={'flex text-xs items-center justify-between mt-2'}>
      <div className={'flex space-x-2'}>
        <button
          type={'button'}
          className={`flex items-center space-x-1 text-slate-600 hover:text-rose-500 ${isLiked ? 'text-rose-500' : 'text-slate-600'}`}
          onClick={handleLikeToggle}
        >
          <span
            className={`like-icon ${isLiked ? 'bg-heartRose' : 'bg-heart'}`}
          />
          <span className={`${isLiked ? 'text-rose-500' : 'text-slate-600'}`}>
            {likes}
          </span>
        </button>
        <button
          type={'button'}
          className={
            'flex items-center space-x-1 text-slate-600 hover:text-blue-500'
          }
        >
          <span
            className={'w-[15px] h-[15px] bg-comment bg-cover'}
            aria-hidden={'true'}
          />
          <span>{comment}</span>
        </button>
        <button
          type={'button'}
          className={`flex items-center space-x-1 ${isBookmarked ? 'text-yellow-500' : 'text-slate-600'} hover:text-yellow-500`}
          onClick={handleBookmarkToggle}
        >
          <span
            className={`bookmark-icon ${isBookmarked ? 'bg-starYellow' : 'bg-star'}`}
          />
          <span>{bookmarks}</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
