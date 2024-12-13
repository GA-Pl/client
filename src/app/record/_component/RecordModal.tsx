'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import PhotoUpload from './PhotoUpload';
import ChooseCategory from './ChooseCategory';
import DetailsForm from './DetailsForm';
import { useRecordStore } from '../_store/useRecordStore';
import postRecord from '../_lib/postRecord';
import { usePhotoStore } from '../_store/usePhotoStore';

export default function RecordModal() {
  const { data: session } = useSession();
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const { setCategory, attachmentId, category } = useRecordStore();

  const router = useRouter();

  const handleInputClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  const handleNextFromPhotos = () => {
    setStep(2);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setStep(3);
  };

  const handleFormSubmit = async (formData: {
    subject: string;
    content: string;
  }) => {
    setIsLoading(true);
    const { subject, content } = formData;
    const token = session?.accessToken;
    if (token && attachmentId && category) {
      try {
        const postData = {
          imageId: attachmentId,
          activity_type: category,
          subject,
          content,
        };

        const response = await postRecord(postData, token);
        console.log('Record Posted:', response);
        setIsLoading(false);
        toast.success('기록이 성공적으로 저장되었습니다!');
        useRecordStore.getState().reset();
        usePhotoStore.getState().reset();

        router.back();
        router.back();
      } catch (error) {
        console.error('Error posting record:', error);
        toast.error('기록 저장에 실패했습니다. 다시 시도해주세요');
      }
    } else {
      console.error('Required data is missing');
      toast.error('필수 정보가 누락되었습니다.');
    }
  };
  return (
    <div
      className={
        'fixed top-0 left-0 w-full h-full bg-slate-800 bg-opacity-85 flex justify-center items-center z-10'
      }
      onClick={router.back}
    >
      <div
        className={
          'flex flex-col bg-slate-100 p-8 rounded-md shadow-md max-w-3xl w-[90dvw] laptop:w-[30rem] desktop:w-[40rem] min-h-[30rem] border-none mx-auto items-center'
        }
        onClick={handleInputClick}
      >
        <div
          className={
            'flex justify-center text-slate-600 border-b border-b-slate-400 py-2 mb-2'
          }
        >
          {'수업 기록하기'}
        </div>
        {step === 1 && (
          <PhotoUpload
            onNext={handleNextFromPhotos}
            accessToken={session?.accessToken || ''}
          />
        )}
        {step === 2 && (
          <ChooseCategory onSelectCategory={handleCategorySelect} />
        )}
        {step === 3 && (
          <DetailsForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
