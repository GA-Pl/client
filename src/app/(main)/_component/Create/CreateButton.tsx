'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const subMenuItems = [
  { name: 'AI 계획안 생성하기', link: '/ai' },
  { name: '계획안 글쓰기', link: '/lessonForm' },
  { name: '수업 사진 기록하기', link: '/record' },
];

const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={'relative'} ref={containerRef}>
      <button
        type={'button'}
        className={
          'hidden bg-primary text-white py-2 px-4 rounded-md laptop:block'
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        {'만들기'}
      </button>
      {isOpen && (
        <div
          className={'absolute right-0 w-48 bg-white shadow-lg mt-2 rounded-md'}
        >
          {subMenuItems.map((item) => (
            <Link key={item.name} href={item.link}>
              <div className={'block px-4 py-2 hover:bg-gray-100'}>
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateButton;
