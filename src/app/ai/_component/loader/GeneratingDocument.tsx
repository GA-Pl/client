import { motion } from 'framer-motion';
import { BounceLoader } from 'react-spinners';

const GeneratingSubject = () => {
  return (
    <motion.div
      className={
        'fixed inset-0 bg-primary bg-opacity-70 flex flex-col items-center justify-center z-50'
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        className={'text-white text-2xl mb-4'}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {'AI 계획안 생성중..'}
      </motion.h2>
      <motion.div
        initial={{ scale: 0.9, rotate: 0 }}
        animate={{ scale: 1, rotate: 20 }}
        transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
      >
        <BounceLoader size={60} color={'#ffffff'} />
      </motion.div>
    </motion.div>
  );
};

export default GeneratingSubject;
