export interface SubMenuItem {
  name: string;
  link: string;
}

export interface MenuItemProps {
  name: string;
  icon: string;
  activeIcon: string;
  link?: string;
  subMenuItems?: SubMenuItem[];
}

export const MENU_ITEMS: MenuItemProps[] = [
  {
    name: '홈',
    icon: '/icons/homeIcon.png',
    activeIcon: '/icons/homeIconPink.png',
    link: '/',
  },
  {
    name: '만들기',
    icon: '/icons/plusIcon.png',
    activeIcon: '/icons/plusIconPink.png',
    link: '#',
    subMenuItems: [
      { name: 'AI 계획안 생성하기', link: '/createAIPlan' },
      { name: '계획안 글쓰기', link: '/writePlan' },
      { name: '수업 사진 기록하기', link: '/recordClassPhoto' },
    ],
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
