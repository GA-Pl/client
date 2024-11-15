'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { IFeed } from '@/types/feed';
import Loader from '@/app/profile/[id]/_component/Loader';
import Feed from './Feed';
import { getFeeds } from '../../_lib/getFeeds';

export default function FeedList() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const { data, isLoading, error } = useQuery(
    ['feeds', accessToken],
    () => {
      if (!accessToken) throw new Error('No access token');
      return getFeeds(session.accessToken);
    },
    {
      enabled: !!session,
      retry: false,
    },
  );

  if (!session) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    console.error('Failed to fetch feeds:', error);
    return <div>{'Error loading feeds'}</div>;
  }

  if (!data?.data.list || !Array.isArray(data.data.list)) {
    console.error('Feed data is not available or not in expected format');
    return <div>{'No feed data available'}</div>;
  }

  return (
    <div>
      {data.data.list.map((feedData: IFeed) => (
        <Feed key={feedData.id} feed={feedData} />
      ))}
    </div>
  );
}
