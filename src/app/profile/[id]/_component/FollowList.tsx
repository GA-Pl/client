'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CustomModal from '@/_component/Modal/CustomModal';
import { IPerson } from '@/types/follow';
import { IProfileData } from '@/types/profile';

interface FollowListProps {
  userInfo: IProfileData;
  follow: IPerson[];
  following: IPerson[];
}
const FollowList = ({ userInfo, follow, following }: FollowListProps) => {
  const { data: session, status } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<IPerson[]>([]);
  const [modalTitle, setModalTitle] = useState<string>('');

  const isLoggedIn = status === 'authenticated' && session?.user;

  if (!isLoggedIn) {
    return null;
  }

  const openModal = (category: string) => {
    const content = category === 'follow' ? follow : following;
    setModalContent(content);
    const userName = userInfo.nickname || 'Someone';
    const title = category === 'follow' ? '팔로워 목록' : '팔로잉 목록';
    setModalTitle(`${userName}의 ${title}`);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={'flex justify-end text-slate-500 text-sm mt-2 '}>
      <div
        className={'flex hover:text-slate-800 hover:cursor-pointer'}
        onClick={() => openModal('follow')}
      >
        <div className={'font-semibold'}>{userInfo?.follow_count}</div>
        <div className={'ml-1'}>{'팔로워'}</div>
      </div>
      <div
        className={'flex ml-4 hover:cursor-pointer hover:text-slate-800'}
        onClick={() => openModal('following')}
      >
        <div className={'font-semibold'}>{userInfo?.following_count}</div>
        <div className={'ml-1'}>{'팔로잉'}</div>
      </div>
      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <h2 className={'font-semibold text-xl text-slate-700'}>{modalTitle}</h2>
        {modalContent?.length > 0 ? (
          modalContent?.map((person: IPerson) => (
            <Link
              href={`/profile/${person.user_id}/plan`}
              className={
                'grid grid-cols-10 gap-4 items-center hover:bg-slate-100 p-4 hover:cursor-pointer'
              }
              style={{ gridTemplateColumns: '10% 60% 20%' }}
              key={person.user_id}
              onClick={() => {
                closeModal();
              }}
            >
              <Image
                src={person.profileImg}
                width={30}
                height={30}
                className={'shadow-md rounded-full mr-4'}
                alt={person.nickname}
              />
              <div className={'flex flex-col'}>
                <h4 className={'text-slate-800 font-semibold'}>
                  {person.nickname}
                </h4>
                <p>{person.selfIntro}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className={'text-slate-500 text-center py-4'}>
            {modalTitle.includes('팔로우')
              ? '팔로워가 존재하지 않습니다.'
              : '팔로잉이 존재하지 않습니다.'}
          </p>
        )}
      </CustomModal>
    </div>
  );
};

export default FollowList;
