'use client';

import { motion } from 'framer-motion';

function ThemeCard({ rank, name }: { rank: number; name: string }) {
  // Framer Motion 애니메이션 설정
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
      className="border bg-gradient-to-r from-yellow-100 via-white to-white p-4 rounded-lg shadow-sm flex items-center justify-between font-pretendard"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={rank} // rank를 통해 딜레이를 동적으로 설정
      style={{
        animationDelay: `${rank * 100}ms`,
      }}
    >
      {/* 순위 강조 */}
      <motion.div
        className="text-xl font-bold text-yellow-500"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 1,
        }}
      >
        {rank}
      </motion.div>
      <div className="text-slate-700 font-medium">{name}</div>
    </motion.div>
  );
}

export default ThemeCard;
