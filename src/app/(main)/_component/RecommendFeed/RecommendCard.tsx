'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface RecommendCardProps {
  profileImg: string;
  title: string;
  sentence: string;
  like: number;
  link: string; // 외부 링크
}

function RecommendCard({
  profileImg,
  title,
  sentence,
  like,
  link,
}: RecommendCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={
        'block bg-white p-4 shadow rounded-lg mb-4 items-center space-x-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg'
      }
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src={profileImg}
        alt={'그림'}
        className={'w-10 h-10 rounded-full'}
        width={100}
        height={100}
      />
      <div className={'flex-1'}>
        <h3 className={'font-semibold'}>{title}</h3>
        <p>{sentence}</p>
      </div>
      <div className={'text-gray-600'}>
        {'👍 '}
        {like}
      </div>
    </motion.a>
  );
}

export default RecommendCard;
