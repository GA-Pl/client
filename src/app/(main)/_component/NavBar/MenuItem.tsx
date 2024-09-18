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
}: MenuItemProps) => {
  if (name === '만들기') {
    const toggleComponent = (
      <ToggleComponent icon={icon} activeIcon={activeIcon} name={name} />
    );

    return (
      <Dropdown toggleComponent={toggleComponent} subMenuItems={subMenuItems} />
    );
  }
  if (link) {
    return (
      <Link
        href={link}
        className={
          'p-4 flex items-center justify-start hover:bg-gray-200 desktop:w-44 laptop:w-16 sidebar-transition'
        }
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
            'ml-2 hidden tablet:hidden laptop:hidden desktop:block sidebar-transition'
          }
        >
          {name}
        </span>
      </Link>
    );
  }

  return null;
};
export default MenuItem;
