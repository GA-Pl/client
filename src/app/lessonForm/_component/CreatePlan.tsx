'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SelectInput } from './SelectInput';
import { BaseInput } from './BaseInput';
import { ActivityTypeSelector } from './ActiveTypeSelector';
import { TextAreaInput } from './TextAreaInput';

export default function FormPage() {
  const [age, setAge] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [activityName, setActivityName] = useState('');
  const [subject, setSubject] = useState('');
  const [activityType, setActivityType] = useState('');
  const [goals, setGoals] = useState(['', '']);
  const [relatedElements, setRelatedElements] = useState(['', '', '']);
  const [contents, setContents] = useState([{ subtitle: '', content: '' }]);
  const [notes, setNotes] = useState('');

  const ageOptions = [
    { label: '만 3세', value: '3' },
    { label: '만 4세', value: '4' },
    { label: '만 5세', value: '5' },
  ];

  const groupSizeOptions = [
    { label: '소집단', value: 'small' },
    { label: '중집단', value: 'medium' },
    { label: '대집단', value: 'large' },
  ];

  const handleGoalsChange = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const handleRelatedElementsChange = (index: number, value: string) => {
    const newElements = [...relatedElements];
    newElements[index] = value;
    setRelatedElements(newElements);
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
    <div className={'container mx-auto px-4 my-24'}>
      <form
        onSubmit={handleSubmit}
        className={'space-y-6 bg-white p-6 rounded-lg shadow-md flex flex-col'}
      >
        <BaseInput
          label={'활동명'}
          id={'activityName'}
          value={activityName}
          onChange={setActivityName}
        />
        <SelectInput
          label={'연령 선택'}
          id={'age'}
          options={ageOptions}
          value={age}
          onChange={setAge}
        />
        <SelectInput
          label={'집단 규모 선택'}
          id={'groupSize'}
          options={groupSizeOptions}
          value={groupSize}
          onChange={setGroupSize}
        />

        <BaseInput
          label={'주제'}
          id={'subject'}
          value={subject}
          onChange={setSubject}
        />
        <ActivityTypeSelector value={activityType} onChange={setActivityType} />
        {goals.map((goal, index) => (
          <BaseInput
            key={uuidv4()}
            label={`활동 목표 ${index + 1}`}
            id={`goal-${index}`}
            value={goal}
            onChange={(value) => handleGoalsChange(index, value)}
          />
        ))}
        {relatedElements.map((element, index) => (
          <BaseInput
            key={uuidv4()}
            label={`누리과정 관련 요소 ${index + 1}`}
            id={`element-${index}`}
            value={element}
            onChange={(value) => handleRelatedElementsChange(index, value)}
          />
        ))}
        <label
          htmlFor={'activity-resource'}
          className={'block text-sm font-medium text-gray-700'}
        >
          {'활동 자료'}
        </label>
        <input
          id={'activity-resource'}
          type={'file'}
          aria-label="활동 자료 파일 업로드"
          aria-describedby={'file-upload-description'}
          className={
            'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          }
        />
        <p id={'file-upload-description'} className={'text-sm text-gray-500'}>
          {'업로드할 파일을 선택하세요.'}
        </p>
        {contents.map((content, index) => (
          <div key={uuidv4()} className={'flex flex-col'}>
            <BaseInput
              label={'소제목'}
              id={`subtitle-${index}`}
              value={content.subtitle}
              onChange={(value) =>
                handleContentsChange(index, 'subtitle', value)
              }
            />
            <TextAreaInput
              label={'세부내용'}
              id={`content-${index}`}
              value={content.content}
              onChange={(value) =>
                handleContentsChange(index, 'content', value)
              }
            />
          </div>
        ))}
        <div className={'flex justify-center'}>
          <button
            type={'button'}
            onClick={addContent}
            className={
              'flex justify-center items-center button-border py-2 px-4 bg-primary text-white text-lg rounded-full hover:bg-primary-dark button-effect hover:bg-white hover:text-primary w-12 h-12'
            }
          >
            {'+'}
          </button>
        </div>
        <TextAreaInput
          label={'유의사항 및 평가'}
          id={'notes'}
          value={notes}
          onChange={setNotes}
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
