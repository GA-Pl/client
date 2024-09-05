import Link from 'next/link';
import MenuItem from './MenuItem';

const ProfileIcon = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
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

  return (
    <div className="flex items-center justify-center m-4">
      <Link href="/profile">
        <div
          className="w-10 h-10 rounded-full tablet:w-8 tablet:h-8"
          style={{
            backgroundImage: 'url(/images/ham.jpeg)',
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
