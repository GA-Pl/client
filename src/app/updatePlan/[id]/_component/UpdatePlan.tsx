'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { category } from '@/_lib/constants/category';
import { useCurriculumHandlers } from '@/_lib/hooks/useNurriCurriculum';
import { IContentItem } from '@/types/content';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { validateFormData } from '@/app/lessonForm/_component/validation/validateFormData';
import SaveButtons from '@/app/lessonForm/_component/section/SaveButtonsSection';
import putPlanner from '@/app/updatePlan/[id]/_component/_lib/putPlanner';
import SubjectInputSection from '@/app/lessonForm/_component/section/SubjectInputSelection';
import AgeSelect from '@/app/lessonForm/_component/select/AgeSelect';
import GroupSelect from '@/app/lessonForm/_component/select/GroupSelect';
import CategorySelect from '@/app/lessonForm/_component/select/CategorySelect';
import GoalsSection from '@/app/lessonForm/_component/section/GoalsSection';
import CurriculumSection from '@/app/lessonForm/_component/nurriCurriculum/CurriculumSection';
import ToolSection from '@/app/lessonForm/_component/section/ToolSection';
import ImageUploadSection from '@/app/lessonForm/_component/section/ImageUploadSection';
import FileUploadSection from '@/app/lessonForm/_component/section/FileUploadSection';
import ContentSection from '@/app/lessonForm/_component/nurriCurriculum/ContentSection';
import PrecautionsSection from '@/app/lessonForm/_component/section/PrecautionSection';
import EvaluationsSection from '@/app/lessonForm/_component/section/EvaluationSection';
import { getPlanners } from '@/app/lessonDetail/_lib/getPlanners';
import Loader from '@/app/profile/[id]/_component/Loader';
import {
  buildNuriCurriculum,
  transformNuriCurriculumToInitialState,
} from './_utils/curriculumUtils';

export default function UpdatePlan({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const plannerId = params.id;

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [detailSubject, setDetailSubject] = useState('');
  const [age, setAge] = useState(0);
  const [groupSize, setGroupSize] = useState('');
  const [activityType, setActivityType] = useState('');
  const [goals, setGoals] = useState([{ id: '', text: '' }]);
  const [tools, setTools] = useState([{ id: '1', value: '' }]);
  const [precautions, setPrecautions] = useState([{ id: '', text: '' }]);
  const [evaluations, setEvaluations] = useState([{ id: '', text: '' }]);
  const [contents, setContents] = useState<IContentItem[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const memoizedSetContents: React.Dispatch<
    React.SetStateAction<IContentItem[]>
  > = useCallback((newContents: React.SetStateAction<IContentItem[]>) => {
    setContents(newContents);
  }, []);

  const [imageId, setImageId] = useState(0);
  const [fileId, setFileId] = useState(0);

  const [isSaving, setIsSaving] = useState(false);

  const {
    curriculumComponents,
    handleNurriClick,
    handleSubNurriClick,
    handleDetailClick,
    addCurriculumComponent,
    removeCurriculumComponent,
  } = useCurriculumHandlers([]);

  const titleInputRef = useRef<HTMLInputElement>(null);

  const { isLoading, error } = useQuery(
    ['planner', plannerId],
    () => getPlanners(plannerId, session?.accessToken || ''),
    {
      enabled: !!session?.accessToken,
      onSuccess: (response) => {
        const classPlan = response.data.class_plan;

        const transformedCurriculum = transformNuriCurriculumToInitialState(
          classPlan.nuri_curriculum,
        );
        curriculumComponents.push(...transformedCurriculum);

        setTitle(classPlan.title);
        setSubject(classPlan.subject);
        setDetailSubject(classPlan.detail_subject);
        setAge(classPlan.age);
        setGroupSize(classPlan.group_amount);
        setActivityType(classPlan.activity_type);
        setImageUrls(classPlan.images);
        setGoals(
          classPlan.activity_goal.map((goal: string) => ({
            id: uuidv4(),
            text: goal,
          })),
        );

        setTools(
          classPlan.activity_tool.map((tool: string) => ({
            id: uuidv4(),
            value: tool,
          })),
        );

        setPrecautions(
          classPlan.precautions.map((precaution: string) => ({
            id: uuidv4(),
            text: precaution,
          })),
        );

        setEvaluations(
          classPlan.evaluation_criteria.map((criterion: string) => ({
            id: uuidv4(),
            text: criterion,
          })),
        );

        setContents(classPlan.activity_content);
        // setCurriculumComponents(classPlan.nuri_curriculum);
      },
      onError: () => {
        toast.error('계획안 데이터를 가져오지 못했습니다.');
      },
    },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const formattedContents = contents.map((content) => ({
    subtitle: content.subtitle,
    content: content.contents?.map((item) => item.text).join('\n'),
  }));

  const formData = {
    title,
    subject,
    detail_subject: detailSubject,
    age,
    image_id: imageId,
    attachment_id: fileId,
    attachmentId: fileId,
    group_size: groupSize,
    activity_type: activityType,
    activity_goal: goals.map((goal) => goal.text),
    activity_tool: tools.map((tool) => tool.value),
    precautions: precautions.map((precaution) => precaution.text),
    evaluation_criteria: evaluations.map((evaluation) => evaluation.text),
    activity_content: formattedContents,
    nuri_curriculum: buildNuriCurriculum(curriculumComponents),
  };

  const handleSave = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const isValid = validateFormData(
      title,
      subject,
      detailSubject,
      age,
      groupSize,
      activityType,
      goals,
      tools,
      precautions,
      evaluations,
      contents,
      curriculumComponents,
    );

    if (!isValid) {
      return;
    }

    setIsSaving(true);

    if (session) {
      try {
        if (session?.accessToken) {
          await putPlanner(formData, session.accessToken, Number(plannerId));
          toast.success('계획안 수정 성공!');
          router.push(`/lessonDetail/${plannerId}`);
        }
      } catch (error) {
        console.error('Error updating planner:', error);
        toast.error('계획안 수정 실패!');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleTempSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      toast.success('임시 저장 성공!');
    } catch (error) {
      toast.error('임시 저장 실패!');
      if (error) {
        console.error(error);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div>{'계획안 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.'}</div>
    );
  }

  return (
    <div>
      <div
        className={
          'space-y-6 bg-white p-6 rounded-lg shadow-md mt-4 mb-16 laptop:mt-0 laptop:mb-0 flex flex-col w-full max-w-4xl mx-auto'
        }
      >
        <input
          type={'text'}
          name={'title'}
          value={title}
          ref={titleInputRef}
          onChange={(e) => setTitle(e.target.value)}
          className={'text-xl laptop:text-3xl focus:outline-none w-full'}
          placeholder={'활동명을 입력하세요 '}
        />
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
        {session && session.accessToken && (
          <>
            <ImageUploadSection
              initialImageUrls={imageUrls}
              imageId={imageId}
              setImageId={setImageId}
              accessToken={session.accessToken}
              id={'activity-resource'}
              label={'이미지'}
              description={'업로드할 이미지를 드롭하거나 클릭해서 선택하세요.'}
            />
            <FileUploadSection
              fileId={fileId}
              setFileId={setFileId}
              accessToken={session.accessToken}
              id={'activity-resource'}
              label={'활동 자료'}
              description={'업로드할 파일을 드롭하거나 클릭해서 선택하세요.'}
            />
          </>
        )}
        <ContentSection contents={contents} setContents={memoizedSetContents} />
        <PrecautionsSection
          precautions={precautions}
          setPrecautions={setPrecautions}
        />
        <EvaluationsSection
          evaluations={evaluations}
          setEvaluations={setEvaluations}
        />
        <SaveButtons
          onSave={handleSave}
          onTempSave={handleTempSave}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}
