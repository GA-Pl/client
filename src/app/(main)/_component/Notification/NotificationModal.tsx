'use client';

import React from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    title: '100만 사용자를 찍는 그날까지...',
    content: '마니또 메이커!!!! 나도 꼭 써보겠어',
    author: '용갱',
    date: '12월 18일',
  },
  {
    id: 2,
    title: '크리스마스 사은행사 🎄✨',
    content: '선물세트 전품목 25% 할인 + 구매금액별 사은품 증정!',
    author: '1995 티브레이크',
    date: '12월 18일',
  },
];

export default function NotificationModal({
  isOpen,
  onClose,
}: NotificationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={
        'fixed inset-0 z-50 flex justify-center items-center bg-slate-900 bg-opacity-50'
      }
      onClick={onClose}
    >
      <div
        className={'bg-white rounded-lg w-full max-w-md p-6 relative'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={'flex justify-between items-center border-b pb-2 mb-4'}>
          <h2 className={'text-lg font-semibold'}>알림</h2>
          <button
            type={'button'}
            className={'text-slate-500 hover:text-black'}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className={'space-y-4'}>
          {notifications.map((notification) => (
            <div key={notification.id} className={'border-b pb-4'}>
              <h3 className={'text-sm font-medium'}>{notification.author}</h3>
              <p className={'text-sm text-slate-500'}>{notification.date}</p>
              <p className={'mt-2'}>{notification.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
