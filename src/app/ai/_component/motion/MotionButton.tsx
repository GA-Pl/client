'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface MotionButtonProps {
  onClick: () => void;
}

const MotionButton = ({ onClick }: MotionButtonProps) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    showButton && (
      <motion.button
        type={'button'}
        onClick={onClick}
        className={
          'items-center p-2 bg-primary text-white font-bold rounded-full cursor-pointer'
        }
        style={{
          width: '80px',
          height: '80px',
          position: 'fixed',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        }}
        initial={{ opacity: 1, scale: 0.8 }}
        whileHover={{
          scale: 1.2,
          boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.8)',
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 3, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      >
        {'시작'}
      </motion.button>
    )
  );
};

export default MotionButton;
