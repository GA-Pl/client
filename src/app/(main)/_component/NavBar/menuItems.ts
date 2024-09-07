import { MenuItemProps } from '@/types/menu';

const MENU_ITEMS: MenuItemProps[] = [
  {
    name: '홈',
    icon: '/icons/homeIcon.png',
    activeIcon: '/icons/homeIconPink.png',
    link: '/',
  },
  // {
  //   name: '검색',
  //   icon: '/icons/searchIcon.png',
  //   activeIcon: '/icons/searchIconPink.png',
  //   link: '/search',
  // },
  {
    name: '만들기',
    icon: '/icons/plusIcon.png',
    activeIcon: '/icons/plusIconPink.png',
    link: '/lessonForm',
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

export default MENU_ITEMS;
