'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
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
import modifyDraft from '@/app/drafts/_lib/modifyDraft';
import postDraft from '@/app/lessonForm/_lib/postDraft';
import {
  buildNuriCurriculum,
  transformNuriCurriculumToInitialState,
} from './_utils/curriculumUtils';

export default function UpdatePlan({ params }: { params: { id: string } }) {
  const [draftId, setDraftId] = useState<number | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const plannerId = params.id;

  const pathname = usePathname();
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
  const [contents, setContents] = useState<IContentItem[]>([
    {
      id: 'default',
      subtitle: '',
      contents: [],
    },
  ]);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

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
  const { error } = useQuery(
    ['planner', plannerId],
    () => getPlanners(plannerId, session?.accessToken || ''),
    {
      enabled: !!session?.accessToken,
      onSuccess: (response) => {
        const classPlan = response?.data?.class_plan || {};

        const transformedCurriculum = transformNuriCurriculumToInitialState(
          classPlan.nuri_curriculum || [],
        );
        curriculumComponents.push(...transformedCurriculum);

        const loadedContents = (classPlan.activity_content || []).map(
          (item: any) => ({
            id: uuidv4(),
            subtitle: item.subtitle || '',
            contents: (item.content || '')
              .split(/(?<=[.?])\s*/)
              .map((text: string) => ({
                id: uuidv4(),
                text: text.trim(),
              })),
          }),
        );
        setContents(loadedContents);

        setTitle(classPlan.title || '');
        setSubject(classPlan.subject || '');
        setDetailSubject(classPlan.detail_subject || '');

        setAge(classPlan.age || 0);
        setGroupSize(classPlan.group_amount || '');
        setActivityType(classPlan.activity_type || '');

        setImageUrls(classPlan.images || []);
        setFileUrls(
          (classPlan.attachments || []).map(
            (attachment: { url: string }) => attachment.url,
          ),
        );

        setGoals(
          (classPlan.activity_goal || [{ id: uuidv4(), text: '' }]).map(
            (goal: any) =>
              typeof goal === 'string'
                ? { id: uuidv4(), text: goal }
                : { id: uuidv4(), text: goal.text || '' },
          ),
        );

        setTools(
          (classPlan.activity_tool || [{ id: uuidv4(), value: '' }]).map(
            (tool: any) =>
              typeof tool === 'string'
                ? { id: uuidv4(), value: tool }
                : { id: uuidv4(), value: tool.value || '' },
          ),
        );

        setPrecautions(
          (classPlan.precautions || [{ id: uuidv4(), text: '' }]).map(
            (precaution: any) =>
              typeof precaution === 'string'
                ? { id: uuidv4(), text: precaution }
                : { id: uuidv4(), text: precaution.text || '' },
          ),
        );

        setEvaluations(
          (classPlan.evaluation_criteria || [{ id: uuidv4(), text: '' }]).map(
            (criterion: any) =>
              typeof criterion === 'string'
                ? { id: uuidv4(), text: criterion }
                : { id: uuidv4(), text: criterion.text || '' },
          ),
        );
      },
      onError: () => {
        toast.error('계획안 데이터를 가져오지 못했습니다.');
      },
    },
  );

  useEffect(() => {
    const draftIdFromUrl = pathname.includes('/drafts/')
      ? parseInt(pathname.split('/drafts/')[1], 10)
      : null;
    setDraftId(draftIdFromUrl);
  }, [pathname]);

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

  const formattedContents = contents?.map((content) => ({
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
    group_size: groupSize,
    activity_type: activityType,
    activity_goal: goals?.map((goal) => goal.text),
    activity_tool: tools?.map((tool) => tool.value),
    precautions: precautions?.map((precaution) => precaution.text),
    evaluation_criteria: evaluations?.map((evaluation) => evaluation.text),
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
          tabIndex={0}
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
          canAddMore={curriculumComponents?.length < 3}
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
              initialFileUrls={fileUrls}
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
