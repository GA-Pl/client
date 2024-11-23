'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PuffLoader } from 'react-spinners';

const ButtonSpinner = () => {
  const loader1Variants = {
    visible: { x: [0, -50], y: [0, 50], opacity: 1 },
    hidden: { x: [0, -50], y: [0, 50], opacity: 0 },
  };

  const loader2Variants = {
    visible: { x: [0, 50], y: [0, 50], opacity: 1 },
    hidden: { x: [0, 50], y: [0, 50], opacity: 0 },
  };

  return (
    <div className={'flex justify-center items-center h-36 w-36 mx-auto'}>
      <AnimatePresence mode={'wait'}>
        <motion.div
          key={'loader1'}
          variants={loader1Variants}
          initial={'hidden'}
          animate={'visible'}
          exit={'hidden'}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
          <PuffLoader color={'#F43F5E'} size={100} />
        </motion.div>
        <motion.div
          key={'loader2'}
          variants={loader2Variants}
          initial={'hidden'}
          animate={'visible'}
          exit={'hidden'}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
          <PuffLoader color={'#3B82F6'} size={100} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ButtonSpinner;
