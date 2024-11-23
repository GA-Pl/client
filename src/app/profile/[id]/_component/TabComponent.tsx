'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

export default function TabComponent() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const match = pathname.match(/\/profile\/(\d+)/);
  const urlUserId = match ? parseInt(match[1], 10) : null;

  const hoverEffect = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const tabTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  };

  const isUserMatch = session?.userId === urlUserId;

  return (
    <div
      className={
        'flex justify-around mb-4 border-b text-slate-800 w-[90vw] laptop:w-[60vw]'
      }
    >
      {['plan', 'record'].concat(isUserMatch ? ['scrap'] : []).map((tab) => (
        <motion.div
          key={tab}
          className={'relative'}
          initial={'rest'}
          whileHover={'hover'}
          animate={'rest'}
          variants={hoverEffect}
        >
          <Link
            href={`/profile/${urlUserId}/${tab}`}
            className={`p-4 pb-6 ${pathname.includes(`/profile/${urlUserId}/${tab}`) ? 'text-blue-500' : ''}`}
          >
            {tab === 'plan' ? '계획안' : tab === 'record' ? '기록' : '스크랩'}
          </Link>
          {pathname.includes(`/profile/${urlUserId}/${tab}`) && (
            <motion.div
              className={
                'absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 mt-1'
              }
              layoutId={'underline'}
              transition={tabTransition}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
