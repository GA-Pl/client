'use client';

interface SearchCategoryProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function SearchCategory({
  activeCategory,
  setActiveCategory,
}: SearchCategoryProps) {
  const categories = ['전체', '계획안', '기록', '사용자'];

  return (
    <div
      className={
        'flex justify-around w-full mt-2 bg-slate-200 text-slate-600 rounded-md laptop:text-sm text-xs p-1'
      }
    >
      {categories.map((category) => (
        <div
          key={category}
          className={`flex justify-center cursor-pointer p-2 w-24 rounded-md ${
            activeCategory === category
              ? 'bg-slate-300 text-slate-800'
              : 'hover:bg-slate-300 hover:text-slate-800'
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
}
