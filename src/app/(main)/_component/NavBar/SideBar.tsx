'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import useToggle from '@/_lib/hooks/useToggle';
import { MenuItemProps } from '@/types/menu';
import MenuItem from './MenuItem';
import ProfileIcon from './ProfileIcon';
import SearchMenu from '../Search/SearchMenu';
import SearchBar from '../Search/SearchBar';

export default function SideBar() {
  const { status } = useSession();

  const isLoggedIn = status === 'authenticated';

  const MENU_ITEMS: MenuItemProps[] = [
    {
      name: '홈',
      icon: '/icons/homeIcon.png',
      activeIcon: '/icons/homeIconPink.png',
      link: '/',
    },

    {
      name: '알림',
      icon: '/icons/bellIcon.png',
      activeIcon: '/icons/bellIconPink.png',
      link: '/notifications',
    },
    {
      name: '스크랩',
      icon: '/icons/heartIcon.png',
      activeIcon: '/icons/heartIconPink.png',
      link: '/scraps',
    },
    {
      name: '설정',
      icon: '/icons/settingIcon.png',
      activeIcon: '/icons/settingIconPink.png',
      link: '/settings',
    },
    {
      name: '로그인',
      icon: '/icons/loginIcon.png',
      activeIcon: '/icons/loginIconPink.png',
      link: '/login',
    },
  ];

  const filteredMenuItems = isLoggedIn
    ? MENU_ITEMS.filter((item: { name: string }) => item.name !== '로그인')
    : MENU_ITEMS.filter((item: { name: string }) =>
        ['홈', '검색'].includes(item.name),
      );

  const [showSearch, toggleSearch] = useToggle();

  return (
    <>
      <div className={'fixed top-0 desktop:hidden laptop:hidden '}>
        <div className={'flex justify-between w-dvw'}>
          <Link href={'/'} className={'m-4'}>
            <Image
              src={'/images/gappleapple.png'}
              width={30}
              height={30}
              alt={'logo'}
              priority
            />
          </Link>
          <ProfileIcon />
        </div>
      </div>
      <div
        className={
          'flex bg-opacity-300 border-b border-gray-200 z-50 shadow-md fixed bottom-0 desktop:left-0 desktop:top-0 desktop:bottom-0 desktop:flex-col desktop:h-dvh desktop:w-36 laptop:w-20 laptop:flex-col laptop:items-center laptop:justify-start laptop:h-dvh tablet:fixed tablet:top-auto tablet:left-0 tablet:right-0 tablet:bottom-0 tablet: h-16 tablet:flex-row tablet:items-center tablet:justify-around sidebar-transition'
        }
      >
        <Link
          href={'/'}
          className={'mt-4 hidden tablet:hidden desktop:block laptop:hidden'}
        >
          <Image
            src={'/images/GappleLogo.png'}
            width={80}
            height={40}
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
            width={25}
            height={25}
            alt={'logo'}
            priority
          />
        </Link>
        <div
          className={
            'flex justify-around items-center border-t border-gray-100 shadow-md tablet:border-none tablet:shadow-none tablet:flex-row desktop:flex-col desktop:mt-16 laptop:mt-16 laptop:flex-col'
          }
        >
          {filteredMenuItems.map((item) => (
            <MenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              activeIcon={item.activeIcon}
              link={item.link}
              subMenuItems={item.subMenuItems}
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
