'use client';

import Link from 'next/link';
import { useRef, useEffect, useState, ReactNode } from 'react';
import { SubMenuItem } from '@/types/menu';

interface DropdownProps {
  toggleComponent: ReactNode;
  subMenuItems?: SubMenuItem[];
}
const Dropdown = ({ toggleComponent, subMenuItems }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={'relative'}>
      <div onClick={toggleDropdown}>{toggleComponent}</div>
      <div
        className={`absolute bg-white shadow-md z-10 bottom-full 
                    w-52  // Dropdown width
                    laptop:left-full laptop:top-0 
                    tablet:bottom-full tablet:right-0
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} // 애니메이션 효과
                  `}
      >
        {subMenuItems?.map((subItem) => (
          <Link
            key={subItem.name}
            href={subItem.link}
            className={
              'block shadow-md p-4 cursor:pointer bg-white hover:bg-gray-100'
            }
          >
            {subItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
