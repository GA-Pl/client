import React from 'react';
import Image from 'next/image';
import { IPlanner } from '@/types/plan';
import ActivityContent from './ActivityContent';
import ActivityTool from './ActivityTools';
import BasicInfo from './BasicInfo';
import Evaluation from './Evaluation';
import GoalTable from './GoalTable';
import Precaution from './Precaution';
import NuriCurriculum from './NurriCurriculum';
import Attachments from './Attachments';
import ImageGallery from './ImageGallery';

const LessonDetails = ({ planner }: { planner: IPlanner }) => {
  return (
    <div className={'bg-white py-4 px-6 shadow rounded-lg'}>
      <div className={'my-4'}>
        <h1 className={'text-3xl font-bold'}>{planner.class_plan.title}</h1>
      </div>
      <BasicInfo
        subject={planner.class_plan.subject}
        detailSubject={planner.class_plan.detail_subject}
        activityType={planner.class_plan.activity_type}
      />
      <GoalTable title={'활동 목표'}>
        {Array.isArray(planner.class_plan.activity_goal) ? (
          planner.class_plan.activity_goal.map((goal) => (
            <div key={goal} className={'flex py-2'}>
              <Image
                src={'/icons/idea.png'}
                width={20}
                height={20}
                alt={'Goal icon'}
                className={'h-5 w-5 mr-2 text-slate-700'}
              />
              {goal}
            </div>
          ))
        ) : (
          <div className={'flex py-2'}>
            <Image
              src={'/icons/idea.png'}
              width={20}
              height={20}
              alt={'Goal icon'}
              className={'h-5 w-5 mr-2 text-slate-700'}
            />
            {planner.class_plan.activity_goal}
          </div>
        )}
      </GoalTable>

      <NuriCurriculum curriculum={planner.class_plan.nuri_curriculum} />
      <div className={'flex justify-between my-4'}>
        <ActivityTool tools={planner.class_plan.activity_tool} />
      </div>
      <ActivityContent contents={planner.class_plan.activity_content} />
      <Precaution precautions={planner.class_plan.precautions} />
      <Evaluation evaluations={planner.class_plan.evaluation_criteria} />
      {planner.class_plan.attachments &&
        planner.class_plan.attachments.length > 0 && (
          <Attachments attachments={planner.class_plan.attachments} />
        )}
      {planner.class_plan.images && planner.class_plan.images.length > 0 && (
        <ImageGallery images={planner.class_plan.images} />
      )}
    </div>
  );
};

export default LessonDetails;
