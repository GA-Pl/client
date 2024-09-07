'use client';

import Image from 'next/image';

interface SearchMenuProps {
  handleSearchClick: () => void;
}

export default function SearchMenu({ handleSearchClick }: SearchMenuProps) {
  return (
    <div>
      <div
        className="p-4 flex items-center justify-start hover:bg-gray-200 hover:cursor-pointer desktop:w-44 laptop:w-16 sidebar-transition"
        onClick={handleSearchClick}
      >
        <div className="relative flex items-center justify-center">
          <Image
            src="/icons/searchIcon.png"
            width={24}
            height={24}
            alt="검색"
            priority
            className="m-2 transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
        <span className="ml-2 hidden tablet:hidden laptop:hidden desktop:block sidebar-transition">
          검색
        </span>
      </div>
    </div>
  );
}
