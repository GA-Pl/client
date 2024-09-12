'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import useToggle from '@/_lib/hooks/useToggle';
import MENU_ITEMS from './menuItems';
import MenuItem from './MenuItem';
import ProfileIcon from './ProfileIcon';
import SearchMenu from '../Search/SearchMenu';
import SearchBar from '../Search/SearchBar';

export default function SideBar() {
  const { status } = useSession();

  const isLoggedIn = status === 'authenticated';

  const filteredMenuItems = isLoggedIn
    ? MENU_ITEMS.filter((item) => item.name !== '로그인')
    : MENU_ITEMS.filter((item) => ['홈', '검색'].includes(item.name));

  const [showSearch, toggleSearch] = useToggle();

  return (
    <>
      <div className={' fixed top-0 desktop:hidden laptop:hidden '}>
        <div className={'flex bg-white bg-opacity-300 justify-between w-dvw'}>
          <Link href={'/'} className={'m-4'}>
            <Image
              src={'/images/gappleapple.png'}
              width={30}
              height={50}
              alt={'logo'}
              priority
            />
          </Link>
          <ProfileIcon />
        </div>
      </div>
      <div
        className={
          'flex bg-white bg-opacity-300 border-b border-gray-200 z-50 shadow-md fixed bottom-0 desktop:left-0 desktop:top-0 desktop:bottom-0 desktop:w-52 desktop:flex-col desktop:h-dvh laptop:w-20 laptop:flex-col laptop:items-center laptop:justify-start laptop:h-dvh tablet:fixed tablet:top-auto tablet:left-0 tablet:right-0 tablet:bottom-0 tablet: h-16 tablet:flex-row tablet:items-center tablet:justify-around sidebar-transition'
        }
      >
        <Link
          href={'/'}
          className={'mt-4 hidden tablet:hidden desktop:block laptop:hidden'}
        >
          <Image
            src={'/images/GappleLogo.png'}
            width={100}
            height={50}
            alt={'logo'}
            priority
          />
        </Link>
        <Link
          href={'/'}
          className={'mt-4 hidden tablet:hidden desktop:hidden laptop:block'}
        >
          <Image
            src={'/images/gappleapple.png'}
            width={30}
            height={50}
            alt={'logo'}
            priority
          />
        </Link>
        <div
          className={
            'flex w-dvw justify-around items-center border-t border-gray-100 shadow-md tablet:border-none tablet:shadow-none tablet:flex-row desktop:flex-col desktop:mt-16 laptop:mt-16 laptop:flex-col'
          }
        >
          {filteredMenuItems.map((item) => (
            <MenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              activeIcon={item.activeIcon}
              link={item.link}
            />
          ))}
          <SearchMenu handleSearchClick={toggleSearch} />
        </div>

        <div className={'hidden desktop:block laptop:block '}>
          <ProfileIcon />
        </div>
      </div>
      <SearchBar showSearch={showSearch} setShowSearch={toggleSearch} />
    </>
  );
}
