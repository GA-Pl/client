'use client';

import { useRef, useEffect, useState, ReactNode, useCallback } from 'react';
import { SubMenuItem } from '@/types/menu';
import Link from 'next/link';

interface DropdownProps {
  toggleComponent: ReactNode;
  subMenuItems?: SubMenuItem[];
}

const Dropdown = ({ toggleComponent, subMenuItems }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className={'relative'}>
      <div onClick={toggleDropdown}>{toggleComponent}</div>
      {isOpen && (
        <div className={`absolute w-36 bg-white`}>
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
      )}
    </div>
  );
};

export default Dropdown;
