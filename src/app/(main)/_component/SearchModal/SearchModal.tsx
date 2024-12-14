'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchCategory from './SearchCategory';

import { useSearch } from './_lib/useSearch';
import SearchResults from './_component/SearchResults';
import SearchHeader from './_component/SearchHeader';

export default function SearchModal() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('전체');

  const mapCategoryToTypes = (category: string) => {
    switch (category) {
      case '계획안':
        return 'PLAN';
      case '기록':
        return 'LOG';
      case '사용자':
        return 'USER';
      default:
        return 'LOG,USER,PLAN';
    }
  };

  const { data, isLoading, isError } = useSearch(
    query,
    mapCategoryToTypes(category),
  );

  return (
    <div
      className={
        'fixed top-0 left-0 w-full h-full bg-slate-800 bg-opacity-85 flex justify-center items-center z-50'
      }
      onClick={router.back}
    >
      <div
        className={
          'relative flex flex-col bg-slate-300 p-4 rounded-md shadow-md w-full h-full max-w-3xl md:w-4/5 md:h-auto md:rounded-lg laptop:w-3/5 desktop:w-2/5 min-h-96 border-none mx-auto'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <SearchHeader
          query={query}
          setQuery={setQuery}
          onClose={() => router.back()}
        />

        <SearchCategory
          activeCategory={category}
          setActiveCategory={setCategory}
        />

        <SearchResults
          query={query}
          isLoading={isLoading}
          isError={isError}
          data={data?.data}
        />
      </div>
    </div>
  );
}
