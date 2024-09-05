'use client';

import { useEffect, useState } from 'react';
import Feed from './Feed';
import IFeed from '@/types/feed';
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

  // function FeedList({ feeds }) {
  return (
    <div className="mt-20">
      {feeds.map((feedData) => (
        <Feed key={feedData.document_id} feed={feedData} />
      ))}
    </div>
  );
}

export default FeedList;
