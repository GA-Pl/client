'use client';

import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { IFeed } from '@/types/feed';
import Loader from '@/app/ai/_component/loader/Loader';
import { getScrap } from '../../_lib/getScrap';
import PlanItem from '../plan/_component/PlanItem';
import RecordItem from '../record/_component/RecordItem';

export default function ScrapPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const { data, isLoading, error } = useQuery(
    ['scrap', accessToken],
    () => {
      if (!accessToken) throw new Error('No access token');
      return getScrap(accessToken);
    },
    {
      enabled: !!session,
      retry: false,
    },
  );

  if (!session) {
    return (
      <div className={'h-[60dvh] py-4'}>
        <Loader />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={'h-[60dvh] py-4'}>
        <Loader />
      </div>
    );
  }

  if (error) {
    console.error('Failed to fetch scrap data:', error);
    return <div>{'Error loading scrap data'}</div>;
  }

  if (!data?.data.list || data.data.list.length === 0) {
    return <div className={'h-dvh ml-4'}>{'스크랩한 글이 없습니다.'}</div>;
  }

  return (
    <div>
      {data.data.list.map((item: IFeed) => {
        const key = uuidv4();
        switch (item.type) {
          case 'PLAN':
            return <PlanItem key={key} data={item} />;
          case 'LOG':
            return <RecordItem key={key} data={item} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
