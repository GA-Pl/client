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
        'flex flex-col bg-white shadow rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105'
      }
      whileHover={{ scale: 1.05 }}
      style={{ aspectRatio: '1 / 1' }}
    >
      <div className={'relative w-full h-[60%]'}>
        <Image src={profileImg} alt={'그림'} fill className={'object-cover'} />
      </div>
      <div className={'p-4 flex flex-col justify-between h-[40%]'}>
        <h3 className={'font-semibold text-slate-800 text-sm mb-2'}>{title}</h3>
        <p className={'text-slate-600 text-xs'}>{sentence}</p>
      </div>
    </motion.a>
  );
}

export default RecommendCard;
