'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

const UserInfo = () => {
  const { data: session, status } = useSession();

  const profileData = {
    experienceLevel: 'Intermediate',
    introduction: '교육의 가치를 믿습니다!',
  };

  if (status === 'loading') {
    return <div>{'Loading...'}</div>;
  }

  const isLoggedIn = status === 'authenticated';

  if (!isLoggedIn || !session?.user) {
    return <div>{'User not logged in'}</div>;
  }

  return (
    <div className={'flex flex-col items-center space-y-4'}>
      <div
        style={{
          position: 'relative',
          width: '120px',
          height: '120px',
        }}
      >
        <Image
          src={session.user.image || '/images/gappler.png'}
          alt={'Profile'}
          width={'100'}
          height={'100'}
          style={{
            borderRadius: '50%',
            width: '120px',
            height: '120px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
          }}
          className={'absolute inset-0 object-cover'}
        />
      </div>
      <h1 className={'text-xl font-semibold'}>{session.user.name}</h1>
      <p>{session.user.email}</p>
      <p className={'text-sm text-gray-600'}>{profileData.experienceLevel}</p>
      <p className={'text-center text-gray-800'}>{profileData.introduction}</p>
    </div>
  );
};

export default UserInfo;
