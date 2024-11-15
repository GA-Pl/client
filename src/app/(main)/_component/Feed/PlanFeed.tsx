import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { IFeed } from '@/types/feed';
import RecordSwiper from '@/app/profile/[id]/record/_component/RecordSwiper';

interface PlanProps {
  plan: IFeed;
}

const PlanFeed = ({ plan }: PlanProps) => {
  return (
    <div>
      <div className={'p-4'}>
        <Link href={`/lessonDetail/${plan.id}`} passHref>
          <h1 className={'text-xl font-bold'}>{plan.title}</h1>
        </Link>
        <div className={'flex desktop:flex-row flex-col mt-2'}>
          <div className={'flex'}>
            <span
              className={
                'text-white bg-slate-700 px-3 py-1 mr-2 rounded-full font-light'
              }
            >
              {plan.age} {'세'}
            </span>
            <span
              className={
                'text-white bg-slate-700 px-3 py-1 mr-2 rounded-full font-light'
              }
            >
              {plan.activity_type}
            </span>
          </div>
          <div>
            <span
              className={
                'text-white bg-slate-700 px-3 py-1 rounded-full font-light desktop:mt-0 mt-2'
              }
              style={{ display: 'inline-block' }}
            >
              {plan.subject}
            </span>
          </div>
        </div>
      </div>
      {plan.images && plan.images.length > 0 && (
        <div className={'px-4 py-0 border-t z-10'}>
          <RecordSwiper images={plan.images} />
        </div>
      )}
      <div className={'flex items-center py-1 pl-4 mt-2'}>
        <Image
          src={'/icons/idea.png'}
          width={20}
          height={20}
          alt={'idea'}
          className={'flex justify-center w-4 h-4 mr-1'}
        />
        <div className={'text-sm text-slate-800 font-medium'}>
          {plan.activity_goal}
        </div>
      </div>
      <Link href={`/lessonDetail/${plan.id}`} passHref>
        <ul className={'px-4 py-2'}>
          {plan.content_subtitles?.map((subtitle, index) => (
            <li
              key={subtitle}
              className={'flex items-center text-slate-700 text-sm mb-1'}
            >
              <div
                className={
                  'flex justify-center items-center text-slate-400 w-4 h-4 rounded-full mr-2'
                }
              >
                {index + 1}
              </div>
              {subtitle}
            </li>
          ))}
        </ul>
        <span
          className={
            'flex justify-end mr-4 text-slate-600 hover:text-slate-400'
          }
        >
          {'...더보기'}
        </span>
      </Link>
    </div>
  );
};

export default PlanFeed;
