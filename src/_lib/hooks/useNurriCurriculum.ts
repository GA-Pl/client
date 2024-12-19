'use client';

import { useState } from 'react';

export const useCurriculumHandlers = (initialState: any) => {
  const defaultComponent = {
    selectedNurri: '',
    selectedSubNurri: '',
    selectedCurriculum: '',
  };

  const [curriculumComponents, setCurriculumComponents] = useState(
    initialState.length > 0 ? initialState : [defaultComponent], // 초기값이 없으면 기본값 추가
  );

  const handleNurriClick = (index: number | bigint | string, nurri: string) => {
    setCurriculumComponents((current: any[]) =>
      current.map((item: { selectedNurri: string }, idx: number) =>
        idx === index
          ? {
              ...item,
              selectedNurri: item.selectedNurri === nurri ? '' : nurri,
              selectedSubNurri: '',
            }
          : item,
      ),
    );
  };

  const handleSubNurriClick = (
    index: number | bigint | string,
    subNurri: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setCurriculumComponents((current: any[]) =>
      current.map((item: { selectedSubNurri: string }, idx: number) =>
        idx === index
          ? {
              ...item,
              selectedSubNurri:
                item.selectedSubNurri === subNurri ? '' : subNurri,
            }
          : item,
      ),
    );
  };

  const handleDetailClick = (
    index: number | bigint | string,
    detail: string,
  ) => {
    setCurriculumComponents((current: any[]) =>
      current.map((item: any, idx: number) =>
        idx === index ? { ...item, selectedCurriculum: detail } : item,
      ),
    );
  };

  const addCurriculumComponent = () => {
    if (curriculumComponents.length < 3) {
      setCurriculumComponents((current: any) => [
        ...current,
        { selectedNurri: '', selectedSubNurri: '', selectedCurriculum: '' },
      ]);
    }
  };

  const removeCurriculumComponent = (index: number | bigint | string) => {
    setCurriculumComponents((current: any[]) =>
      current.filter((_: any, idx: number) => idx !== index),
    );
  };

  return {
    curriculumComponents,
    handleNurriClick,
    handleSubNurriClick,
    handleDetailClick,
    addCurriculumComponent,
    removeCurriculumComponent,
  };
};
