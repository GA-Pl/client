import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRecordStore } from '../_store/useRecordStore';
import Spinner from './Spinner';

interface DetailsFormProps {
  onSubmit: (data: { subject: string; content: string }) => void;
  isLoading: boolean;
}

const DetailsForm = ({ onSubmit, isLoading }: DetailsFormProps) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const { setSubject, setContent, subject, content } = useRecordStore();

  useEffect(() => {
    setIsFormValid(subject.length > 0 && content.length > 1);
  }, [subject, content]);

  useEffect(() => {
    if (subject.length === 11) {
      toast.warning('주제는 최대 10자까지 입력 가능합니다!', {
        toastId: 'subject-limit',
      });
    }
    if (content.length === 101) {
      toast.warning('내용은 최대 100자까지 입력 가능합니다!', {
        toastId: 'content-limit',
      });
    }
  }, [subject, content]);

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit({ subject, content });
    }
  };

  return (
    <div className={'flex flex-col space-y-4'}>
      <ToastContainer position={'top-center'} autoClose={3000} limit={1} />
      <div className={'flex flex-col'}>
        <span className={'text-sm ml-auto text-slate-500'}>
          {subject.length}
          {'/10'}
        </span>
        <input
          type={'text'}
          placeholder={'주제'}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={10}
          className={
            'px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md'
          }
        />
      </div>
      <div className={'flex flex-col tablet:w-[20rem] laptop:w-[25rem]'}>
        <span className={'text-sm ml-auto text-slate-500'}>
          {content.length}
          {'/100'}
        </span>
        <textarea
          placeholder={'내용'}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={100}
          className={
            'px-4 py-2 h-40 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md'
          }
        />
      </div>
      <button
        type={'button'}
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`px-4 py-2 text-white ${isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-300 cursor-not-allowed'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {isLoading ? <Spinner /> : '제출'}
      </button>
    </div>
  );
};

export default DetailsForm;
