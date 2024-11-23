'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface RecommendCardProps {
  profileImg: string;
  title: string;
  sentence: string;
  link: string;
}

function RecommendCard({
  profileImg,
  title,
  sentence,
  link,
}: RecommendCardProps) {
  return (
    <motion.a
      href={link}
      target={'_blank'}
      rel={'noopener noreferrer'}
      className={
        'flex flex-col bg-white p-4 shadow rounded-lg mb-4 items-center space-x-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg'
      }
      whileHover={{ scale: 1.05 }}
    >
      <div className={'grid grid-cols-[15%_85%] items-center w-full'}>
        <Image
          src={profileImg}
          alt={'그림'}
          className={'w-8 h-8 rounded-full shadow-md'}
          width={100}
          height={100}
        />

        <h3 className={'font-semibold ml-2 text-slate-800'}>{title}</h3>
      </div>

      <p className={'text-slate-600'}>{sentence}</p>
    </motion.a>
  );
}

export default RecommendCard;
