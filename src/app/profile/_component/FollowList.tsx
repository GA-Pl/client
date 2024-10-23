'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import CustomModal from '@/_component/Modal/CustomModal';
import { IFollowData, IPerson } from '@/types/follow';
import Image from 'next/image';

const FollowList = ({ follow, following }: IFollowData) => {
  const { data: session, status } = useSession();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<IPerson[]>([]);
  const [modalTitle, setModalTitle] = useState<string>('');

  const isLoggedIn = status === 'authenticated' && session?.user;

  if (!isLoggedIn) {
    return <div>{'User not logged in'}</div>;
  }
  const openModal = (content: IPerson[], category: string) => {
    setModalContent(content);

    const userName = session?.user?.name || 'Someone';

    if (category === 'follow') {
      setModalTitle(`${userName}이(가) 팔로우 중인 사람`);
    } else if (category === 'following') {
      setModalTitle(`${userName}을(를) 팔로잉 하는 사람`);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className={'flex justify-end text-slate-500 text-sm mt-2'}>
      <div
        className={'flex hover:text-slate-800 hover:cursor-pointer'}
        onClick={() => openModal(follow.follow_people, 'follow')}
      >
        <div className={'font-semibold'}>{follow?.number}</div>
        <div className={'ml-1'}>{'팔로우'}</div>
      </div>
      <div
        className={'flex ml-4 hover:cursor-pointer hover:text-slate-800'}
        onClick={() => openModal(following.following_people, 'following')}
      >
        <div className={'font-semibold'}>{following?.number}</div>
        <div className={'ml-1'}>{'팔로잉'}</div>
      </div>
      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <div>
          <h2 className={'font-semibold text-xl text-slate-700'}>
            {modalTitle}
          </h2>
          {modalContent.map((person: IPerson) => (
            <div
              className={
                'grid grid-cols-10 gap-4 items-center hover:bg-slate-100 p-4 hover:cursor-pointer'
              }
              style={{ gridTemplateColumns: '10% 60% 20%' }}
              key={person.id}
            >
              <Image
                src={person.image}
                width={30}
                height={30}
                className={'shadow-md rounded-full mr-4'}
                alt={person.name}
              />
              <div className={'flex flex-col'}>
                <h4 className={'text-slate-800 font-semibold'}>
                  {person.name}
                </h4>
                <p>{person.introduction}</p>
              </div>
              <button
                type={'button'}
                className={
                  'bg-primary100 text-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-300 py-2 text-xs'
                }
              >
                팔로우
              </button>
            </div>
          ))}
        </div>
      </CustomModal>
    </div>
  );
};

export default FollowList;
