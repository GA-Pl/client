'use client';

import Image from 'next/image';

interface SearchHeaderProps {
  query: string;
  setQuery: (value: string) => void;
  onClose: () => void;
}

export default function SearchHeader({
  query,
  setQuery,
  onClose,
}: SearchHeaderProps) {
  return (
    <div className="flex border-b pb-1 border-slate-200 p-4 relative">
      <button
        type={'button'}
        className="absolute top-0 right-0 text-slate-600 hover:text-slate-900 focus:outline-none"
        onClick={onClose}
      >
        <span className="text-2xl font-bold">×</span>
      </button>
      <Image
        src={'/icons/searchWhite.png'}
        width={30}
        height={30}
        alt={'search icon'}
      />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요..."
        className="w-full pl-2 ml-2 bg-transparent focus:outline-none text-slate-900"
      />
    </div>
  );
}
