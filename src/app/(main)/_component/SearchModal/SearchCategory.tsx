'use client';

import React, { useState } from 'react';

export default function SearchCategory() {
  const categories = ['전체', '계획안', '기록', '사용자'];
  const [activeCategory, setActiveCategory] = useState('');

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div
      className={
        'flex justify-around w-full mt-2 bg-slate-200 text-slate-600 rounded-md text-sm p-1'
      }
    >
      {categories.map((category) => (
        <div
          key={category}
          className={`flex justify-center cursor-pointer p-2 w-28 rounded-md ${
            activeCategory === category
              ? 'bg-slate-300 text-slate-800'
              : 'hover:bg-slate-300 hover:text-slate-800'
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
}
