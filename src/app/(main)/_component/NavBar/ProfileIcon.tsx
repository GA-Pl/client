'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import MenuItem from './MenuItem';

const ProfileIcon = () => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>{'Loading...'}</div>;
  }

  const isLoggedIn = status === 'authenticated';
  const userImg = session?.user?.image;

  if (!isLoggedIn) {
    return (
      <div>
        <MenuItem
          key={'login'}
          name={'로그인'}
          icon={'/icons/loginIcon.png'}
          activeIcon={'/icons/loginIconPink.png'}
          link={'/login'}
        />
      </div>
    );
  }

  const imageSrc = userImg || '/images/gappler.png';

  return (
    <div className={'flex items-center justify-center m-4'}>
      <Link href={'/profile'}>
        <div
          className={
            'w-10 laptop:w-12 laptop:h-12 h-10 rounded-full tablet:w-8 tablet:h-8'
          }
          style={{
            backgroundImage: `url('${imageSrc}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
          }}
        />
      </Link>
    </div>
  );
};

export default ProfileIcon;
