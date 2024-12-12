import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { IPlanner } from '@/types/plan';
import { ClipLoader } from 'react-spinners';
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
  const printRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [forceExpandAll, setForceExpandAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (printRef.current) {
      setIsReady(true);
    }
  }, [printRef]);

  const handlePrintNow = useReactToPrint({
    contentRef: printRef,
    documentTitle: planner.class_plan.title,
    onAfterPrint: () => {
      setForceExpandAll(false);
      setIsLoading(false);
      toast.success('PDF 출력이 완료되었습니다!');
    },
  });

  const handlePrint = () => {
    setForceExpandAll(true);
    setIsLoading(true);
    setTimeout(() => {
      handlePrintNow();
    }, 500);
  };

  return (
    <div>
      {isLoading && (
        <div
          className={
            'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          }
        >
          <div className={'text-center'}>
            <ClipLoader color={'#ffffff'} size={50} />
            <p className={'mt-4 text-white'}>{'PDF 변환 중...'}</p>
          </div>
        </div>
      )}

      <div ref={printRef} className={'bg-white py-4 px-6 shadow rounded-lg'}>
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
        <ActivityContent
          contents={planner.class_plan.activity_content}
          forceExpandAll={forceExpandAll}
        />
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

      <div className={'flex justify-end'}>
        <button
          type={'button'}
          onClick={handlePrint}
          disabled={!isReady}
          className={`mt-4 py-2 px-4 rounded ${
            isReady
              ? 'bg-primary text-white hover:bg-primary700'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Image
            width={30}
            height={30}
            src={'/icons/whitepdf.png'}
            alt={'pdf'}
            className={'mb-2'}
          />
          <span>{'저장'}</span>
        </button>
      </div>
    </div>
  );
};

export default LessonDetails;
