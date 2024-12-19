import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BounceLoader } from 'react-spinners';
import MenuItem from './MenuItem';

const DropdownMenu = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }
  return (
    <div className={'absolute mt-2 py-2 w-24 bg-white rounded-lg shadow-xl'}>
      <Link
        href={`/profile/${session.userId}/plan`}
        className={
          'block px-4 py-2 text-center text-sm text-slate-700 hover:bg-slate-100'
        }
      >
        {'내 프로필'}
      </Link>
      <Link
        href={`/drafts`}
        className={
          'block px-4 py-2 text-center text-sm text-slate-700 hover:bg-slate-100'
        }
      >
        {'임시저장'}
      </Link>
      <button
        type={'button'}
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
        className={
          'block px-4 py-2 w-full text-sm text-red-700 hover:bg-slate-100'
        }
      >
        {'로그아웃'}
      </button>
    </div>
  );
};

const ProfileIcon = () => {
  const { data: session, status } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = () => {
      setMenuVisible(false);
    };

    handleRouteChange();
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuRef]);

  if (status === 'loading') {
    return (
      <div className={'flex justify-center items-center mt-64'}>
        <BounceLoader color={'#FF69B4'} />
      </div>
    );
  }

  const isLoggedIn = status === 'authenticated';
  const userImg = session?.profileImg;

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
    <div className={'flex items-center justify-center m-4 relative'}>
      {/* Profile Button */}
      <button
        type={'button'}
        onClick={() => setMenuVisible(!menuVisible)}
        aria-label={'Toggle profile options'}
      >
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
      </button>

      {menuVisible && (
        <div
          ref={menuRef}
          className={
            'absolute top-[-85px] left-full ml-2 py-2 w-32 z-10 laptop:top-[-50px]'
          }
        >
          <DropdownMenu />
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
