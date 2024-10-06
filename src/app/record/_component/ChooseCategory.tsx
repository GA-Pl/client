'use client';

import React, { useState } from 'react';
import { category } from '@/_lib/constants/category';
import CategorySelect from '@/app/lessonForm/_component/CategorySelect';

export default function ChooseCategory() {
  const [selectCategory, setSelectCategory] = useState('');
  const handleCategorySelect = (value: string) => {
    setSelectCategory(value);
    console.log(`선택된 카테고리: ${selectCategory}`);
  };
  return <CategorySelect options={category} onSelect={handleCategorySelect} />;
}
