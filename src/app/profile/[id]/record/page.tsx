'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import { IFeed } from '@/types/feed';
import Loader from '@/app/ai/_component/loader/Loader';
import RecordItem from './_component/RecordItem';
import { getLog } from '../../_lib/getLog';

export default function RecordPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const userId = Number(params.id);

  const { data, isLoading, error } = useQuery(
    ['records', accessToken],
    () => {
      if (!accessToken) throw new Error('No access token');
      return getLog(accessToken, userId);
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
    console.error('Failed to fetch records:', error);
    return <div>{'Error loading records'}</div>;
  }

  if (!data?.data.list || !Array.isArray(data.data.list)) {
    console.error('Record data is not available or not in expected format');
    return <div>{'No record data available'}</div>;
  }

  return (
    <div>
      {data.data.list.map((item: IFeed) => (
        <RecordItem key={uuidv4()} data={item} />
      ))}
    </div>
  );
}
