'use client';

import React, { useState } from 'react';
import { category } from '@/_lib/constants/category';
import { useCurriculumHandlers } from '@/_lib/hooks/useNurriCurriculum';
import CategorySelect from './CategorySelect';
import AgeSelect from './AgeSelect';
import GroupSelect from './GroupSelect';
import CurriculumSection from './CurriculumSection';
import SubjectInputSection from './SubjectInputSelection';
import ContentSection from './ContentSection';
import GoalsSection from './GoalsSection';
import PrecautionsSection from './PrecautionSection';
import EvaluationsSection from './EvaluationSection';
import FileUploadSection from './FileUploadSection';

export default function FormPage() {
  const [subject, setSubject] = useState('');
  const [detailSubject, setDetailSubject] = useState('');
  const [goals, setGoals] = useState(['', '']);
  const [contents, setContents] = useState([{ subtitle: '', content: '' }]);
  const [precautions, setPrecautions] = useState(['']);
  const [evaluations, setEvaluations] = useState(['']);
  const initialState = [
    { selectedNurri: '', selectedSubNurri: '', selectedCurriculum: '' },
  ];
  const {
    curriculumComponents,
    handleNurriClick,
    handleSubNurriClick,
    handleDetailClick,
    addCurriculumComponent,
    removeCurriculumComponent,
  } = useCurriculumHandlers(initialState);

  const ageOptions = [
    { label: '만 3세', value: '3', image: '/images/age/age3.png' },
    { label: '만 4세', value: '4', image: '/images/age/age4.png' },
    { label: '만 5세', value: '5', image: '/images/age/age5.png' },
  ];

  const groupSizeOptions = [
    { label: '소집단', value: 'small', image: '/images/group/small.png' },
    { label: '중집단', value: 'medium', image: '/images/group/medium.png' },
    { label: '대집단', value: 'large', image: '/images/group/large.png' },
  ];

  const handleSubjectChange = (value: string) => {
    setSubject(value);
  };

  const handleDetailSubjectChange = (value: string) => {
    setDetailSubject(value);
  };

  const handleAgeSelect = (value: string) => {
    console.log(`선택된 나이: 만 ${value}세`);
  };

  const handleGroupSelect = (value: string) => {
    console.log(`선택된 집단: ${value}`);
  };

  const handleCategorySelect = (value: string) => {
    console.log(`선택된 카테고리: ${value}`);
  };

  const handleContentsChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newContents = contents.map((content, i) => {
      if (i === index) {
        return { ...content, [field]: value };
      }
      return content;
    });
    setContents(newContents);
  };

  const addContent = () => {
    setContents([...contents, { subtitle: '', content: '' }]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={'container mx-auto'}>
      <form
        onSubmit={handleSubmit}
        className={
          'space-y-6 bg-white p-6 rounded-lg shadow-md mt-2 flex flex-col'
        }
      >
        <div>
          <input
            type={'text'}
            name={'title'}
            className={'text-xl laptop:text-3xl focus:outline-none'}
            placeholder={'활동명을 입력하세요 '}
          />
          <div className={'ml-2 p-2  w-1/12 '} />
        </div>
        <SubjectInputSection
          subject={subject}
          detailSubject={detailSubject}
          onSubjectChange={handleSubjectChange}
          onDetailSubjectChange={handleDetailSubjectChange}
        />

        <AgeSelect options={ageOptions} onSelect={handleAgeSelect} />
        <GroupSelect options={groupSizeOptions} onSelect={handleGroupSelect} />
        <CategorySelect options={category} onSelect={handleCategorySelect} />
        <GoalsSection goals={goals} setGoals={setGoals} />
        <CurriculumSection
          curriculumComponents={curriculumComponents}
          handleNurriClick={handleNurriClick}
          handleSubNurriClick={handleSubNurriClick}
          handleDetailClick={handleDetailClick}
          removeCurriculumComponent={removeCurriculumComponent}
          addCurriculumComponent={addCurriculumComponent}
          canAddMore={curriculumComponents.length < 3}
        />
        <FileUploadSection
          id={'activity-resource'}
          label={'활동 자료'}
          description={'업로드할 파일을 드롭하거나 클릭해서 선택하세요.'}
        />
        <ContentSection
          contents={contents}
          handleContentsChange={handleContentsChange}
          addContent={addContent}
        />
        <PrecautionsSection
          precautions={precautions}
          setPrecautions={setPrecautions}
        />
        <EvaluationsSection
          evaluations={evaluations}
          setEvaluations={setEvaluations}
        />
        <button
          type={'submit'}
          className={
            'button-border py-2 px-4 bg-primary text-white rounded hover:bg-white hover:text-primary'
          }
        >
          {'저장하기'}
        </button>
      </form>
    </div>
  );
}
