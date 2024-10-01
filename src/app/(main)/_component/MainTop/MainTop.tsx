'use client';

import { useState } from 'react';
import CreateBtn from '../Create/CreateBtn';
import Dropdown from '../NavBar/Dropdown';
import SearchBar from '../SearchBar/SearchBar';

function MainTop() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const subMenuItems = [
    { name: 'AI 계획안 생성하기', link: '/ai' },
    { name: '계획안 글쓰기', link: '/lessonForm' },
    { name: '수업 사진 기록하기', link: '/record' },
  ];

  return (
    <div className="flex justify-around">
      <SearchBar />
      <div className="flex flex-col">
        <CreateBtn onClick={toggleDropdown} />
        {isOpen && (
          <Dropdown toggleComponent={<div />} subMenuItems={subMenuItems} />
        )}
      </div>
    </div>
  );
}

export default MainTop;
