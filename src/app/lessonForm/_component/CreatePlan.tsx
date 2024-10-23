'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
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
import ToolSection from './ToolSection';
import submitLessonForm from '../_lib/api';

export default function FormPage() {
  const { data: session } = useSession();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [detailSubject, setDetailSubject] = useState('');
  const initialGoals = [{ id: '', text: '' }];
  const [goals, setGoals] = useState(initialGoals);
  const [tools, setTools] = useState([{ id: '1', value: '' }]);
  const [contents, setContents] = useState([{ subtitle: '', content: '' }]);
  const initialPrecautions = [{ id: '', text: '' }];
  const [precautions, setPrecautions] = useState(initialPrecautions);
  const initialEvaluations = [{ id: '', text: '' }];
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [age, setAge] = useState(3);
  const [groupSize, setGroupSize] = useState('SMALL');
  const [activityType, setActivityType] = useState('');
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
    { label: '만 3세', value: 3, image: '/images/age/age3.png' },
    { label: '만 4세', value: 4, image: '/images/age/age4.png' },
    { label: '만 5세', value: 5, image: '/images/age/age5.png' },
  ];

  const groupSizeOptions = [
    { label: '소집단', value: 'SMALL', image: '/images/group/small.png' },
    { label: '중집단', value: 'MEDIUM', image: '/images/group/medium.png' },
    { label: '대집단', value: 'LARGE', image: '/images/group/large.png' },
  ];

  const handleSubjectChange = (value: string) => {
    setSubject(value);
  };

  const handleDetailSubjectChange = (value: string) => {
    setDetailSubject(value);
  };

  const handleAgeSelect = (value: number) => {
    setAge(value);
  };

  const handleGroupSelect = (value: string) => {
    setGroupSize(value);
  };

  const handleCategorySelect = (value: string) => {
    setActivityType(value);
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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const formData = {
      title,
      subject,
      detail_subject: detailSubject,
      age,
      group_size: groupSize,
      activity_type: activityType,
      activity_goal: goals.map((goal) => goal.text),
      activity_tool: tools.map((tool) => tool.value),
      precautions: precautions.map((precaution) => precaution.text),
      evaluation_criteria: evaluations.map((evaluation) => evaluation.text),
      activity_content: contents.map((content) => ({
        subtitle: content.subtitle,
        content: content.content,
      })),
      nuri_curriculum: curriculumComponents.map(
        (component: {
          selectedNurri: string;
          selectedSubNurri: string;
          selectedCurriculum: string;
        }) => ({
          main_category: component.selectedNurri,
          sub_category: component.selectedSubNurri,
          content: component.selectedCurriculum,
        }),
      ),
    };

    if (session) {
      try {
        const result = await submitLessonForm(formData, session.accessToken);
        console.log('서버 응답:', result);
      } catch (error) {
        console.error('폼 제출 실패:', error);
      }
    }
  };

  return (
    <div className={'container mx-auto'}>
      <div
        className={
          'space-y-6 bg-white p-6 rounded-lg shadow-md mt-2 flex flex-col'
        }
      >
        <div>
          <input
            type={'text'}
            name={'title'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={'text-xl laptop:text-3xl focus:outline-none w-full'}
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

        <AgeSelect
          options={ageOptions}
          selectedAge={age}
          onSelect={handleAgeSelect}
        />
        <GroupSelect
          options={groupSizeOptions}
          selectedGroupSize={groupSize}
          onSelect={handleGroupSelect}
        />
        <CategorySelect
          options={category}
          selectedActivityType={activityType}
          onSelect={handleCategorySelect}
        />
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
        <ToolSection tools={tools} setTools={setTools} />
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
          type={'button'}
          onClick={handleSubmit}
          className={
            'button-border py-2 px-4 bg-primary text-white rounded hover:bg-white hover:text-primary'
          }
        >
          {'저장하기'}
        </button>
      </div>
    </div>
  );
}
