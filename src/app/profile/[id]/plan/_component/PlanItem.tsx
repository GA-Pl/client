'use client';

import Image from 'next/image';
import { IFeed } from '@/types/feed';
import ActionButtons from '@/_component/Item/ActionButtons';
import CustomItem from '@/_component/Item/CustomItem';
import formatRelativeTime from '@/app/(main)/_lib/formatRelativeTime';
import RecordSwiper from '../../record/_component/RecordSwiper';

interface PlanProps {
  data: IFeed | null;
}

const PlanItem = ({ data }: PlanProps) => {
  if (!data) return null;

  return (
    <div className={'flex flex-col items-center mb-4'}>
      <div className={'flex justify-start items-center mb-2 mr-auto'}>
        <div
          className={'w-12 h-12 rounded-full'}
          style={{
            backgroundImage: `url(${data.authorThumbnailImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
          }}
        />
        <div className={'ml-2'}>
          <strong>{data.authorNickname}</strong>
          <div className={'text-slate-500 text-xs'}>
            {formatRelativeTime(data.createdAt)}
          </div>
        </div>
      </div>
      <CustomItem>
        <div className={'flex justify-between items-center'}>
          <h2 className={'text-lg font-semibold'}>{data.title}</h2>
        </div>
        <div className={'flex flex-col mb-2'}>
          <div className={'flex flex-col laptop:flex-row my-4'}>
            <span
              className={
                'text-white bg-slate-700 px-3 py-1 rounded-full mr-2 font-light'
              }
            >
              {data.age}
              {'세'}
            </span>
            <span
              className={
                'text-white bg-slate-700 px-3 py-1 rounded-full mr-2 font-light'
              }
            >
              {data.activity_type}
            </span>
            <span
              className={
                'text-white bg-slate-700 px-3 py-1 rounded-full font-light laptop:mt-0 mt-2'
              }
            >
              {data.subject}
            </span>
          </div>
          <RecordSwiper images={data.images} />
          <ul className={'px-4 py-2'}>
            {data.content_subtitles?.map((subtitle, index) => (
              <li
                key={subtitle}
                className={'flex items-center text-slate-700 mb-1'}
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
              'flex justify-end mr-4 text-slate-600 hover:text-slate-400 text-sm'
            }
          >
            {' ...더보기'}
          </span>
        </div>
        <div className={'flex items-center py-1 text-blue-500 rounded-md mt-2'}>
          <Image
            src={'/icons/idea.png'}
            alt={'idea'}
            width={20}
            height={20}
            className={'flex justify-center w-4 h-4 mr-1'}
          />
          <div className={'text-sm text-slate-500 font-thin'}>
            {data.activity_goal}
          </div>
        </div>
        <ActionButtons
          like={data.liked_count}
          comment={data.comments.length}
          scrap={data.bookmark_count}
          isLiked={data.liked}
          isBookmarked={data.bookmarked}
          postId={data.id}
        />
      </CustomItem>
    </div>
  );
};

export default PlanItem;
