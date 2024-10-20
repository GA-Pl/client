'use client';

import { useSession } from 'next-auth/react';
import { greetings } from '@/_lib/constants/greetings';
import TypingEffect from '../motion/TypingEffect';
import MotionButton from '../motion/MotionButton';
import Loader from '../loader/Loader';

interface StartProps {
  onProceed: () => void;
}

const Start = ({ onProceed }: StartProps) => {
  const { data: session, status } = useSession();

  const currentMonth = new Date().getMonth();
  const season =
    currentMonth >= 2 && currentMonth <= 4
      ? 'spring'
      : currentMonth >= 5 && currentMonth <= 7
        ? 'summer'
        : currentMonth >= 8 && currentMonth <= 10
          ? 'fall'
          : 'winter';

  const greeting =
    greetings[season][Math.floor(Math.random() * greetings[season].length)];
  const seasonSuffix = {
    spring: '봄의',
    summer: '여름의',
    fall: '가을의',
    winter: '겨울의',
  }[season];

  if (status === 'loading') {
    return <Loader />;
  }

  if (!session?.user) {
    return <div>{'로그인을 해주세요.'}</div>;
  }

  const introText = `${greeting} ${seasonSuffix} ${session.user.name} 쌤!\nAI 교육계획안을 작성해드리는 GAPPLE 입니다!`;

  return (
    <div className={'flex flex-col w-100 text-xl m-2'}>
      <div className={'mb-4'}>{'안녕하세요!'}</div>
      <TypingEffect text={introText} />
      <MotionButton onClick={onProceed} />
    </div>
  );
};

export default Start;
