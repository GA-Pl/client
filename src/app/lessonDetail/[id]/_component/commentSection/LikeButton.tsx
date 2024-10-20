'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LikeButtonProps {
  count: number;
  onLike: (liked: boolean) => void;
}

const LikeButton = ({ count, onLike }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike(!liked);
  };

  const iconPath = liked ? '/icons/heartIconPink.png' : '/icons/heartIcon.png';

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
      <span>{count}</span>
    </button>
  );
};

export default LikeButton;
