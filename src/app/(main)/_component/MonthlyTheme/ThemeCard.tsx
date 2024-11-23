'use client';

import { motion } from 'framer-motion';

function ThemeCard({ rank, name }: { rank: number; name: string }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <motion.div
      className={
        'border bg-gradient-to-r from-indigo-100 via-white to-white p-4 rounded-lg shadow-sm flex items-center justify-between font-pretendard'
      }
      variants={cardVariants}
      initial={'hidden'}
      animate={'visible'}
      whileHover={'hover'}
      custom={rank}
      style={{
        animationDelay: `${rank * 100}ms`,
      }}
    >
      <motion.div
        className={'text-xl font-bold text-indigo-400'}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 1,
        }}
      >
        {rank}
      </motion.div>
      <div className={'text-slate-700 font-medium'}>{name}</div>
    </motion.div>
  );
}

export default ThemeCard;
