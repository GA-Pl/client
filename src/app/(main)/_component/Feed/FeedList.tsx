'use client';

import { useEffect, useState } from 'react';
import { IFeed } from '@/types/feed';
import Feed from './Feed';
import nurriCurriculum from '../../_lib/nurriCurriculum';

function FeedList() {
  const [feeds, setFeeds] = useState<IFeed[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/data/dummyFeeds.JSON');
        const data = await res.json();

        if (!res.ok) {
          setFeeds(nurriCurriculum.mockData);
        }
        setFeeds(data.mockData);
      } catch (error) {
        console.error('Failed to load data', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={'mt-20'}>
      {feeds.map((feedData) => (
        <Feed key={feedData.document_id} feed={feedData} />
      ))}
    </div>
  );
}

export default FeedList;
