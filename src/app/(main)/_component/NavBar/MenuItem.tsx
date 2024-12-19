import Image from 'next/image';
import Link from 'next/link';
import { MenuItemProps } from '@/types/menu';
import Dropdown from './Dropdown';
import ToggleComponent from './ToggleComponent';

const MenuItem = ({
  name,
  icon,
  activeIcon,
  link,
  subMenuItems,
  onClick,
}: MenuItemProps) => {
  // "만들기" 메뉴의 경우, 토글 컴포넌트와 Dropdown 사용
  if (name === '만들기') {
    const toggleComponent = (
      <ToggleComponent icon={icon} activeIcon={activeIcon} name={name} />
    );

    return (
      <Dropdown toggleComponent={toggleComponent} subMenuItems={subMenuItems} />
    );
  }

  // 링크가 있는 경우 Link 컴포넌트 사용
  if (link) {
    return (
      <Link
        href={link}
        className={
          'p-4 mt-2 flex items-center justify-start hover:bg-gray-200 desktop:w-32 laptop:w-16 h-14 text-sm sidebar-transition'
        }
        scroll={false}
      >
        <div className={'relative flex items-center justify-center'}>
          <Image
            src={icon || activeIcon}
            width={24}
            height={24}
            alt={`${name} Icon`}
            priority
            className={
              'm-2 transition-transform duration-300 ease-in-out hover:scale-110'
            }
          />
        </div>
        <span
          className={
            'ml-2 hidden tablet:hidden laptop:hidden desktop:block sidebar-transition text-slate-800'
          }
        >
          {name}
        </span>
      </Link>
    );
  }

  // 링크가 없는 경우 div로 렌더링
  return (
    <div
      className={
        'p-4 mt-2 flex items-center justify-start hover:bg-gray-200 desktop:w-32 laptop:w-16 h-14 text-sm sidebar-transition cursor-pointer'
      }
      onClick={onClick}
    >
      <div className={'relative flex items-center justify-center'}>
        <Image
          src={icon || activeIcon}
          width={24}
          height={24}
          alt={`${name} Icon`}
          priority
          className={
            'm-2 transition-transform duration-300 ease-in-out hover:scale-110'
          }
        />
      </div>
      <span
        className={
          'ml-2 hidden tablet:hidden laptop:hidden desktop:block sidebar-transition text-slate-800'
        }
      >
        {name}
      </span>
    </div>
  );
};

export default MenuItem;
