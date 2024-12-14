'use client';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ActivityContentProps {
  contents: {
    subtitle: string;
    content: string;
  }[];
  forceExpandAll: boolean;
}

const ActivityContent = ({
  contents,
  forceExpandAll,
}: ActivityContentProps) => {
  const [expanded, setExpanded] = useState<boolean[]>(
    Array(contents.length)
      .fill(false)
      .map((_, index) => index === 0),
  );
  const [allExpanded, setAllExpanded] = useState(false);

  useEffect(() => {
    setExpanded(Array(contents.length).fill(forceExpandAll));
  }, [forceExpandAll, contents.length]);

  const toggleContent = (index: number) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const toggleAllContent = () => {
    const newState = !allExpanded;
    setAllExpanded(newState);
    setExpanded(Array(contents.length).fill(newState));
  };

  return (
    <div className={'my-4'}>
      <div className={'flex items-center justify-between mb-4'}>
        <h2 className={'text-lg font-semibold'}>{'활동 내용'}</h2>

        <button
          type={'button'}
          onClick={toggleAllContent}
          className={'text-blue-500 '}
        >
          {allExpanded ? '소제목만 보기' : '전체 내용보기'}
        </button>
      </div>
      {contents.map((content, index) => (
        <div key={content.subtitle} className={'mb-4'}>
          <div
            className={'flex justify-between items-center cursor-pointer'}
            onClick={() => toggleContent(index)}
          >
            <h3 className={'font-semibold text-md'}>{content.subtitle}</h3>
            <button type={'button'} className={'text-lg'}>
              {expanded[index] ? '▼' : '▲'}
            </button>
          </div>
          <div
            className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
              expanded[index] ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            {content.content.split('\n').map((line) => (
              <p
                key={uuidv4()}
                className={
                  'text-gray-700 whitespace-pre-line break-words mt-4 pb-2'
                }
              >
                {'- '}
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityContent;
