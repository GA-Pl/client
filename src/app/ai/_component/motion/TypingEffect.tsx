import React from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

interface TypingEffectProps {
  text: string;
}

const TypingEffect = React.memo(({ text = '' }: TypingEffectProps) => {
  const charactersWithUUID = React.useMemo(() => {
    return Array.from(text).map((char) => ({
      char,
      id: uuidv4(),
    }));
  }, [text]);

  return (
    <motion.div
      className={'inline-block my-4'}
      style={{ whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}
      initial={'hidden'}
    >
      {charactersWithUUID.map(({ char, id }, index) => (
        <motion.span
          key={id}
          className={'text-xl'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 0.05,
            duration: 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
});

TypingEffect.displayName = 'TypingEffect';

export default TypingEffect;
