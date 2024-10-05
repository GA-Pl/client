import Image from 'next/image';
import React, { useState } from 'react';

interface AgeOptionProps {
  label: string;
  value: string;
  image: string;
}

interface AgeSelectorProps {
  options: AgeOptionProps[];
  onSelect: (value: string) => void;
}

const AgeSelect = ({ options, onSelect }: AgeSelectorProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>('3');

  const handleAgeClick = (value: string) => {
    onSelect(value);
    setSelectedValue(value);
  };

  return (
    <>
      <h1 className={'title-effect'}>{'연령 선택'}</h1>
      <div className={'flex justify-center laptop:justify-start items-center'}>
        <div className={'grid grid-cols-3 gap-x-3'}>
          {options.map((option) => (
            <button
              type={'button'}
              key={option.value}
              onClick={() => handleAgeClick(option.value)}
              className={`focus:outline-none bg-transparent border-4 transition duration-300 ease-in-out 
                         ${option.value === selectedValue ? 'border-primary300' : 'hover:border-gray-300 border-transparent'}`}
            >
              <Image
                width={100}
                height={100}
                src={option.image}
                alt={`만 ${option.value}세`}
                className={'w-20 h-20 laptop:w-28 laptop:h-28'}
              />
              <div className={'text-slate-700 text-xs laptop:text-base'}>
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AgeSelect;
