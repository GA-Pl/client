'use client';

import React from 'react';
import CustomItem from '@/_component/Item/CustomItem';
import ActionButtons from '@/_component/Item/ActionButtons';
import formatRelativeTime from '@/app/(main)/_lib/formatRelativeTime';
import { IFeed } from '@/types/feed';
import RecordSwiper from './RecordSwiper';

interface RecordItemProps {
  data: IFeed | null;
}

const PlanItem = ({ data }: RecordItemProps) => {
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
          {data.images && data.images.length > 0 && (
            <RecordSwiper images={data.images} />
          )}
        </div>
        <div className={'px-4 py-2 text-base text-slate-800'}>
          {data.content}
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
