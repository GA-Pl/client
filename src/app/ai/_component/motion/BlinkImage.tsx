'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface BlinkImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const BlinkImage = ({ src, width, height, alt }: BlinkImageProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0.6 }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 2,
      }}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={'mt-4 mb-4'}
      />
    </motion.div>
  );
};

export default BlinkImage;
