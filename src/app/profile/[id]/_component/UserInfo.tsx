'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import CustomModal from '@/_component/Modal/CustomModal';
import { IProfileData, PutProfileParams } from '@/types/profile';
import ProfileForm from './ProfileForm';
import Loader from './Loader';
import FollowButton from './FollowButton';

interface UserInfoProps {
  userInfo: IProfileData | null;
  updateUserInfo: (
    data: PutProfileParams,
    callbacks: { onSuccess?: () => void; onError?: (error: any) => void },
  ) => void;
  userId: number;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const UserInfo = ({
  userInfo,
  updateUserInfo,
  userId,
  isLoading,
  isError,
  error,
}: UserInfoProps) => {
  const { data: session, status } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // 로딩 중 상태 처리
  if (status === 'loading' || isLoading) {
    return <Loader />;
  }

  // 인증되지 않은 상태 또는 API 에러 처리
  if (status !== 'authenticated' || isError) {
    console.error('Authentication or data fetching error:', error);
    return <div>{'사용자 정보를 불러올 수 없습니다.'}</div>;
  }

  // userInfo가 비어있을 때 처리
  if (!userInfo) {
    return <div>{'사용자 정보가 없습니다.'}</div>;
  }

  return (
    <div
      className={
        'flex flex-col items-center space-y-4 bg-white px-8 rounded-lg pb-4 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out laptop:h-[35dvh] h-[45dvh] mx-auto laptop:flex-row laptop:justify-around laptop:w-[60dvw] desktop:w-60dvw w-[90dvw] desktop:w-[45rem]'
      }
    >
      <div className={'relative w-36 h-36 rounded-full'}>
        <Image
          src={userInfo.profileImg || '/images/gappler.png'} // 안전한 기본값 처리
          alt={'Profile'}
          width={150}
          height={150}
          className={'rounded-full object-cover shadow-md'}
          style={{
            width: '150px',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '100%',
          }}
        />
      </div>
      <div className={'flex flex-col laptop:ml-8'}>
        <h1 className={'text-xl font-semibold text-slate-800'}>
          {userInfo.nickname || '닉네임 없음'}
        </h1>
        <div className={'text-sm text-slate-500'}>
          {userInfo.level || 'Level Info'}
        </div>
        <div className={'text-sm text-slate-600 mt-2'}>
          {userInfo.selfIntro || '교육의 가치를 믿습니다!'}
        </div>
        {userId === session.userId ? (
          <button
            type={'button'}
            className={
              'mt-2 w-20 py-1 bg-slate-700 hover:bg-slate-500 text-white font-medium rounded-md text-xs'
            }
            onClick={openModal}
          >
            {'프로필 수정'}
          </button>
        ) : (
          <FollowButton
            personId={userId}
            initialFollowed={userInfo.is_followed_by_current_user}
            accessToken={session.accessToken}
          />
        )}
      </div>
      {modalIsOpen && (
        <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
          <ProfileForm
            profileData={userInfo}
            updateUserInfo={updateUserInfo}
            setModalIsOpen={setModalIsOpen}
            accessToken={session.accessToken}
            setLoading={setLoading}
            loading={loading}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default UserInfo;
