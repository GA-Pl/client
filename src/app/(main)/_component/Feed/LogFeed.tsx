import React from 'react';
import { IFeed } from '@/types/feed';

import RecordSwiper from '@/app/profile/[id]/record/_component/RecordSwiper';

interface LogProps {
  log: IFeed;
}

const LogFeed = ({ log }: LogProps) => {
  return (
    <div className={'p-4'}>
      <div className={'flex my-2'}>
        <span
          className={
            'text-white bg-slate-700 px-3 py-1 mr-2 rounded-full font-light'
          }
        >
          {log.subject}
        </span>
        <span
          className={
            'text-white bg-slate-700 px-3 py-1 mr-2 rounded-full font-light'
          }
        >
          {log.activity_type}
        </span>
      </div>
      {log.images && log.images.length > 0 && (
        <div className={'px-4 py-0 border-t z-10'}>
          <RecordSwiper images={log.images} />
        </div>
      )}
      <div className={'px-4 py-2 text-base text-slate-800'}>{log.content}</div>
    </div>
  );
};

export default LogFeed;
