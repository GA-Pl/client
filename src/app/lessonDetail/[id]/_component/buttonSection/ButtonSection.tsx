'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { submitLike, submitBookmark } from '@/app/(main)/_lib/submitButton';

interface ButtonSectionProps {
  liked: boolean;
  likedCount: number;
  bookmarked: boolean;
  bookmarkCount: number;
  postId: number;
  accessToken: string;
}

export default function ButtonSection({
  liked,
  likedCount,
  bookmarked,
  bookmarkCount,
  postId,
  accessToken,
}: ButtonSectionProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const [likes, setLikes] = useState(likedCount);
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [bookmarks, setBookmarks] = useState(bookmarkCount);

  const [active, setActive] = useState({
    heart: false,
    star: false,
    share: false,
  });

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
      toast.error(`Like action failed : ${error.message}. Please try again.`);
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

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('링크 복사 완료!');
    } catch (error) {
      toast.error('링크 복사에 실패하였습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  return (
    <div
      className={
        'flex desktop:flex-col items-center desktop:space-y-8 justify-center bg-white shadow-md desktop:py-4 desktop:px-2 rounded-full px-4 py-2'
      }
    >
      <div
        className={'flex items-center relative cursor-pointer'}
        onMouseEnter={() => setActive((prev) => ({ ...prev, heart: true }))}
        onMouseLeave={() => setActive((prev) => ({ ...prev, heart: false }))}
        onClick={handleLikeToggle}
      >
        <Image
          src={
            active.heart || isLiked
              ? '/icons/heartRose.png'
              : '/icons/heartlightgray.png'
          }
          width={35}
          height={35}
          alt={'Heart'}
          className={'w-6 desktop:w-8'}
        />
        <span
          className={
            'desktop:hidden text-slate-400 text-xs font-semibold ml-2 mr-8'
          }
        >
          {likes}
        </span>
        <span
          className={
            'hidden desktop:block absolute desktop:top-12 desktop:-translate-x-1/2 desktop:right-3 desktop:left-1/2 translate-x-full -translate-y-1/2 right-0 text-slate-500 text-xs font-semibold'
          }
        >
          {likes}
        </span>
      </div>
      <div
        className={'flex items-center relative cursor-pointer'}
        onMouseEnter={() => setActive((prev) => ({ ...prev, star: true }))}
        onMouseLeave={() => setActive((prev) => ({ ...prev, star: false }))}
        onClick={handleBookmarkToggle}
      >
        <Image
          src={
            active.star || isBookmarked
              ? '/icons/starYellow.png'
              : '/icons/starlightgray.png'
          }
          width={35}
          height={35}
          alt={'Star'}
          className={'w-6 desktop:w-8'}
        />
        <span
          className={
            'desktop:hidden text-slate-400 text-xs font-semibold ml-2 mr-2'
          }
        >
          {bookmarks}
        </span>
        <span
          className={
            'hidden desktop:block absolute desktop:top-12 desktop:-translate-x-1/2 desktop:right-3 desktop:left-1/2 translate-x-full -translate-y-1/2 right-0 text-slate-500 text-xs font-semibold'
          }
        >
          {bookmarks}
        </span>
      </div>
      <div
        className={'relative cursor-pointer'}
        onMouseEnter={() => setActive((prev) => ({ ...prev, share: true }))}
        onMouseLeave={() => setActive((prev) => ({ ...prev, share: false }))}
        onClick={handleShareClick}
      >
        <Image
          src={
            active.share ? '/icons/sharegray.png' : '/icons/sharelightgray.png'
          }
          width={35}
          height={35}
          className={'hidden desktop:block'}
          alt={'Share'}
        />
      </div>
    </div>
  );
}
