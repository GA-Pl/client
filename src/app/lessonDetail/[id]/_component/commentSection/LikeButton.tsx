'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LikeButtonProps {
  isLiked: boolean;
  count: number;
  onLike: (liked: boolean) => void;
}

const LikeButton = ({ isLiked, count, onLike }: LikeButtonProps) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    setLiked(!liked);
    onLike(!liked);
  };

  const iconPath = liked ? '/icons/heartRose.png' : '/icons/heartIcon.png';

  return (
    <button
      type={'button'}
      onClick={handleLike}
      className={
        'flex items-center space-x-2 text-blue-600 hover:text-blue-800'
      }
    >
      <Image
        width={20}
        height={20}
        src={iconPath}
        alt={'Like icon'}
        className={'w-4 h-4'}
      />
      <span className={'text-sm'}>{count}</span>
    </button>
  );
};

export default LikeButton;
