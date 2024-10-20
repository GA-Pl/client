import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface Option {
  name: string;
  value: string;
  image?: string;
}

interface OptionSelectorProps {
  options: Option[];
  onOptionSelect: (option: Option) => void;
  hasImages?: boolean;
  questionKey?: string;
  onRecommendOtherActivity?: () => void;
}

const OptionSelector = ({
  options,
  onOptionSelect,
  hasImages,
  questionKey,
  onRecommendOtherActivity,
}: OptionSelectorProps) => {
  const [showRecommendButton, setShowRecommendButton] = useState(false);
  useEffect(() => {
    if (questionKey === 'activity') {
      const timer = setTimeout(() => {
        setShowRecommendButton(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [questionKey]);

  const gridClass =
    questionKey === 'activity'
      ? 'flex flex-col items-center mt-4'
      : options.length > 1
        ? `grid grid-cols-${Math.min(options.length, 4)} gap-x-0.5`
        : 'flex justify-center';

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.5,
        duration: 0.5,
      },
    }),
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={gridClass}>
      <AnimatePresence mode={'popLayout'}>
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={'hidden'}
            animate={'visible'}
            exit={'hidden'}
            custom={index}
            variants={itemVariants}
            onClick={() => onOptionSelect(option)}
            className={`${options.length > 1 ? 'option-button' : 'laptop:w-52 w-28'} m-1 p-1 laptop:m-2 laptop:p-2 border rounded flex flex-col items-center button-effect bg-white`}
          >
            {hasImages && option.image ? (
              <>
                <Image
                  width={100}
                  height={100}
                  src={option.image}
                  alt={option.name}
                  className={'mb-2'}
                />
                <span className={'text-xs laptop:text-base'}>
                  {option.name}
                </span>
              </>
            ) : (
              <div>{option.name}</div>
            )}
          </motion.button>
        ))}
      </AnimatePresence>
      {showRecommendButton && (
        <motion.button
          className={
            'mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300'
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onRecommendOtherActivity}
        >
          {'다른 활동 추천받기'}
        </motion.button>
      )}
    </div>
  );
};

export default OptionSelector;
