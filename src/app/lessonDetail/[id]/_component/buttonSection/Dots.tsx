'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter, usePathname } from 'next/navigation';
import deletePlanner from '@/app/lessonDetail/_lib/deletePlanner';

const ConfirmDeleteToast = ({
  id,
  accessToken,
  closeToast,
  onDeleteSuccess,
}: {
  id: number;
  accessToken: string;
  closeToast: () => void;
  onDeleteSuccess: () => void;
}) => (
  <div>
    <p className={'mb-4 text-slate-700'}>{'정말 삭제하시겠습니까?'}</p>
    <div className={'flex justify-end gap-2'}>
      <button
        type={'button'}
        onClick={async () => {
          try {
            await deletePlanner(id, accessToken);
            toast.success('삭제되었습니다.', { position: 'top-center' });
            onDeleteSuccess();
          } catch (error) {
            toast.error(`삭제 실패. 다시 시도해주세요. ${error}`, {
              position: 'top-center',
            });
          } finally {
            closeToast();
          }
        }}
        className={'px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'}
      >
        {'확인'}
      </button>
      <button
        type={'button'}
        onClick={closeToast}
        className={'px-4 py-2 bg-slate-300 rounded hover:bg-slate-400'}
      >
        {'취소'}
      </button>
    </div>
  </div>
);

const Dots = ({ id, accessToken }: { id: number; accessToken: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 확인

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

  const handleDelete = () => {
    toast.warn(
      <ConfirmDeleteToast
        id={id}
        accessToken={accessToken}
        closeToast={() => toast.dismiss()}
        onDeleteSuccess={() => router.push('/')}
      />,
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        toastId: 'delete-toast',
      },
    );
  };

  const menuItems = [
    {
      name: '수정하기',
      onClick: () => router.push(`/updatePlan/${id}`),
    },
  ];

  const filteredMenuItems = pathname.includes('/log/') ? [] : menuItems;

  return (
    <div className={'relative'} ref={containerRef}>
      <button
        type={'button'}
        className={'flex items-center ml-4 cursor-pointer bg-transparent'}
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={
            isHovered ? '/icons/dotsslate100.png' : '/icons/dotsslate200.png'
          }
          width={25}
          height={25}
          alt={'dots'}
        />
      </button>

      {isOpen && (
        <div
          className={
            'absolute right-0 w-32 bg-white shadow-lg mt-2 rounded-md z-10 text-sm'
          }
        >
          {filteredMenuItems.map((item) => (
            <button
              key={item.name}
              type={'button'}
              onClick={item.onClick}
              className={
                'block w-full text-left px-4 py-2 hover:bg-slate-100 text-slate-700'
              }
            >
              {item.name}
            </button>
          ))}
          <button
            type={'button'}
            onClick={handleDelete}
            className={
              'block w-full text-left px-4 py-2 hover:bg-slate-100 text-red-400'
            }
          >
            {'삭제하기'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Dots;
