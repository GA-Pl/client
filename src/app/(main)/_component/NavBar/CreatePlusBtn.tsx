import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const subMenuItems = [
  { name: 'AI 계획안 생성하기', link: '/ai' },
  { name: '계획안 글쓰기', link: '/lessonForm' },
  { name: '수업 사진 기록하기', link: '/record' },
];

const CreatePlusBtn = () => {
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
    <div className={'laptop:mt-4 laptop:mb-4 relative'} ref={containerRef}>
      <button
        type={'button'}
        className={
          'cursor-pointer bg-primary100 hover:bg-primary300 text-primary font-bold py-2 px-4 w-10 h-10 rounded-full text-sm leading-none'
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        {'+'}
      </button>
      {isOpen && (
        <div
          className={
            'absolute right-1 laptop:right-0 laptop:left-20 laptop:top-1 w-48 bg-white shadow-lg mt-2 rounded-md z-10'
          }
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

export default CreatePlusBtn;
