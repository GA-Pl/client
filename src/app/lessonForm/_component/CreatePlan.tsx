'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';
import { category } from '@/_lib/constants/category';
import { useCurriculumHandlers } from '@/_lib/hooks/useNurriCurriculum';
import { IContentItem } from '@/types/content';
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
import SaveButtons from '@/app/lessonForm/_component/section/SaveButtonsSection';
import submitLessonForm from '@/app/lessonForm/_lib/api';
import { useSubjectStore } from '@/app/ai/_store/useSubjectStore';
import { validateFormData } from '@/app/lessonForm/_component/validation/validateFormData';
import modifyDraft from '@/app/drafts/_lib/modifyDraft';
import postDraft from '../_lib/postDraft';

export default function CreatePlan() {
  const [draftId, setDraftId] = useState<number | null>(null);
  const { documentData } = useSubjectStore();
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [detailSubject, setDetailSubject] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const [contents, setContents] = useState<IContentItem[]>([]);

  const memoizedSetContents: React.Dispatch<
    React.SetStateAction<IContentItem[]>
  > = useCallback((newContents: React.SetStateAction<IContentItem[]>) => {
    setContents(newContents);
  }, []);

  const initialGoals = [{ id: '', text: '' }];
  const [goals, setGoals] = useState(initialGoals);
  const [tools, setTools] = useState([{ id: '1', value: '' }]);
  const initialPrecautions = [{ id: '', text: '' }];
  const [precautions, setPrecautions] = useState(initialPrecautions);
  const initialEvaluations = [{ id: '', text: '' }];
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [age, setAge] = useState(0);
  const [groupSize, setGroupSize] = useState('');
  const [activityType, setActivityType] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [fileId, setFileId] = useState(0);
  const [imageId, setImageId] = useState(0);
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

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  useEffect(() => {
    titleInputRef.current?.focus();
    if (documentData && pathname === '/ai') {
      titleInputRef.current?.focus();
      setTitle(documentData.data.title || '');
      setSubject(documentData.data.subject || '');
      setDetailSubject(documentData.data.detail_subject || '');
      setActivityType(documentData.data.activity_type || '');
      const loadedGoals = documentData.data.activity_goal.map(
        (goal: string) => ({
          id: uuidv4(),
          text: goal,
        }),
      );
      setGoals(loadedGoals);

      const loadedTools = documentData?.data.activity_tool.map(
        (tool: string) => ({
          id: uuidv4(),
          value: tool,
        }),
      );
      setTools(loadedTools);
      const loadedPrecautions = documentData?.data.precautions.map(
        (precaution) => ({
          id: uuidv4(),
          text: precaution,
        }),
      );
      setPrecautions(loadedPrecautions);

      const loadedEvaluations = documentData?.data.evaluation_criteria.map(
        (criterion) => ({
          id: uuidv4(),
          text: criterion,
        }),
      );
      setEvaluations(loadedEvaluations);
    }
  }, [documentData, pathname]);

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
    content: content.contents.map((item) => item.text).join('\n'),
  }));

  const formData = {
    title: title.trim(),
    subject: subject.trim(),
    detail_subject: detailSubject.trim(),
    age,
    group_size: groupSize.trim(),
    activity_type: activityType.trim(),
    activity_goal: goals.map((goal) => goal.text).filter((text) => text),
    activity_tool: tools.map((tool) => tool.value).filter((value) => value),
    precautions: precautions
      .map((precaution) => precaution.text)
      .filter((text) => text),
    evaluation_criteria: evaluations
      .map((evaluation) => evaluation.text)
      .filter((text) => text),
    activity_content: formattedContents,

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
    image_id: imageId,
    attachment_id: fileId,
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
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
        const result = await submitLessonForm(formData, session.accessToken);
        toast.success('계획안 생성 성공!');
        router.push(`/lessonDetail/${result.data}`);
      } catch (error) {
        toast.error('계획안 생성 실패!');
        console.error('폼 제출 실패:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleTempSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!formData.title || formData.title.trim() === '') {
      toast.error('임시 저장을 위해 제목을 입력해주세요.');
      return;
    }

    setIsSaving(true);

    try {
      if (!draftId) {
        const result = await postDraft(formData, session?.accessToken || '');
        setDraftId(result.data);
        toast.success('임시 저장 성공!');
        console.log('Draft created with ID:', result.data);
      } else {
        await modifyDraft(formData, session?.accessToken || '', draftId);
        toast.success('임시 저장이 업데이트되었습니다!');
      }
    } catch (error) {
      toast.error('임시 저장 실패!');
      console.error('임시 저장 중 오류 발생:', error);
    } finally {
      setIsSaving(false);
    }
  };

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
          onChange={(e) => {
            e.stopPropagation();
            setTitle(e.target.value);
          }}
          className={
            'text-xl laptop:text-3xl focus:outline-none w-full z-50 bg-transparent'
          }
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
          onSave={handleSubmit}
          onTempSave={handleTempSave}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}
