import { MenuItemProps } from '@/types/menu';

export const MENU_ITEMS: MenuItemProps[] = [
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
    name: '만들기',
    icon: '/icons/plusIcon.png',
    activeIcon: '/icons/plusIconPink.png',
    subMenuItems: [
      { name: 'AI 계획안 생성하기', link: '/ai' },
      { name: '계획안 글쓰기', link: '/lessonForm' },
      { name: '수업 사진 기록하기', link: '/record' },
    ],
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
