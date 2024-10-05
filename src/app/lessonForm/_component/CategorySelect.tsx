import Image from 'next/image';
import React, { useState } from 'react';

interface CategoryOptionProps {
  name: string;
  value: string;
  image: string;
}

interface CategorySelectorProps {
  options: CategoryOptionProps[];
  onSelect: (value: string) => void;
}

const CategorySelect = ({ options, onSelect }: CategorySelectorProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>('3');

  const handleCategoryClick = (value: string) => {
    onSelect(value);
    setSelectedValue(value);
  };

  return (
    <>
      <h1 className={'title-effect'}>{'활동 유형 선택'}</h1>
      <div className={'flex justify-center laptop:justify-center items-center'}>
        <div
          className={
            'grid grid-cols-3 laptop:grid-cols-4 laptop:gap-x-3 desktop:grid-cols-6 gap-x-1'
          }
        >
          {options.map((option) => (
            <button
              type={'button'}
              key={option.value}
              onClick={() => handleCategoryClick(option.value)}
              className={`focus:outline-none bg-transparent border-4 transition duration-300 ease-in-out 
                         ${option.value === selectedValue ? 'border-primary300' : 'hover:border-gray-300 border-transparent'}`}
            >
              <Image
                width={100}
                height={100}
                src={option.image}
                alt={`만 ${option.value}세`}
                className={'w-20 h-20 laptop:w-28 laptop:h-28 object-contain'}
              />
              <div className={'text-slate-700 text-xs desktop:text-base'}>
                {option.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategorySelect;
