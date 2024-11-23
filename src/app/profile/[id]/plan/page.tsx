'use client';

import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { IFeed } from '@/types/feed';
import Loader from '@/app/ai/_component/loader/Loader';
import PlanItem from './_component/PlanItem';
import { getPlan } from '../../_lib/getPlan';

export default function PlanPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const userId = Number(params.id);

  const { data, isLoading, error } = useQuery(
    ['plans', accessToken, userId],
    () => {
      if (!accessToken) throw new Error('No access token');
      return getPlan(accessToken, userId);
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
    console.error('Failed to fetch plans:', error);
    return <div>{'Error loading plans'}</div>;
  }

  if (!data?.data.list || !Array.isArray(data.data.list)) {
    console.error('Plan data is not available or not in expected format');
    return <div>{'No plan data available'}</div>;
  }

  return (
    <div>
      {data.data.list.map((item: IFeed) => (
        <PlanItem key={uuidv4()} data={item} />
      ))}
    </div>
  );
}
