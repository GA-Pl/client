'use client';

import React, { Dispatch, SetStateAction, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  ageQuestion,
  groupSizeQuestion,
  subjectQuestion,
  activityTypeQuestion,
} from '@/_lib/constants/aiQuestionList';
import { IOption, ISelectedAnswers } from '@/types/aiOption';
import TypingEffect from '../motion/TypingEffect';
import OptionSelector from '../motion/OptionSelector';
import { useAi } from '../../_lib/useAi';
import { useSubjectStore } from '../../_store/useSubjectStore';

type BasicQuestionProps = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

const questions = [
  ageQuestion,
  groupSizeQuestion,
  subjectQuestion,
  activityTypeQuestion,
];

const BasicQuestion = ({ currentStep, setCurrentStep }: BasicQuestionProps) => {
  const [customSubject, setCustomSubject] = useState('');
  const [retry, setRetry] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const { addSubject } = useAi(accessToken!, 1, 1);

  const { selectedAnswers, updateSelectedAnswer, setLoading } =
    useSubjectStore();

  const handleOptionSelect = useCallback(
    (option: IOption) => {
      const currentQuestion = questions[currentStep];
      updateSelectedAnswer(currentQuestion.field, option.value);
      if (currentStep < questions.length - 1 && currentStep < 3) {
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
        }, 0);
      }
    },
    [currentStep, setCurrentStep, updateSelectedAnswer],
  );

  const handleCustomSubjectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomSubject(e.target.value);
  };

  const handleCustomSubjectSubmit = () => {
    updateSelectedAnswer('subject', customSubject);
    setCurrentStep(currentStep + 1);
  };

  function isCompleteAnswers(answers: ISelectedAnswers): answers is {
    age: number;
    groupSize: string;
    subject: string;
    activityType: string;
  } {
    return (
      answers.age !== 0 &&
      (answers.groupSize?.length || 0) > 0 &&
      (answers.subject?.length || 0) > 0 &&
      (answers.activityType?.length || 0) > 0
    );
  }

  const { question, options, field } = questions[currentStep];

  const handleGenerateAI = async () => {
    setRetry(false);
    setLoading(true);

    const previousStep = currentStep;

    if (accessToken && isCompleteAnswers(selectedAnswers)) {
      try {
        await addSubject(selectedAnswers);
        setCurrentStep(4);
      } catch (error) {
        console.error('Failed to generate AI:', error);
        setRetry(true);
        setCurrentStep(previousStep);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Missing required information or access token');
      setRetry(true);
      setCurrentStep(previousStep);
      setLoading(false);
    }
  };

  return (
    <div className={'flex flex-col items-center justify-center'}>
      <TypingEffect text={question} />
      {field === 'subject' ? (
        <div className={'flex flex-col items-center mt-4'}>
          <div className={'mb-4'}>
            <input
              type={'text'}
              value={customSubject}
              onChange={handleCustomSubjectChange}
              placeholder={'직접 주제를 입력하세요'}
              className={'py-2 px-4 h-10 border border-gray-300 rounded'}
            />
            <button
              type={'button'}
              onClick={handleCustomSubjectSubmit}
              disabled={!customSubject}
              className={`py-2 px-4 h-10 mt-2 bg-blue-500 text-white rounded ${
                customSubject
                  ? 'hover:bg-blue-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {'등록'}
            </button>
          </div>
          <OptionSelector
            options={options}
            onOptionSelect={handleOptionSelect}
            hasImages={options.some((opt) => 'image' in opt)}
          />
        </div>
      ) : (
        <OptionSelector
          options={options}
          onOptionSelect={handleOptionSelect}
          hasImages={options.some((opt) => 'image' in opt)}
        />
      )}
      {isCompleteAnswers(selectedAnswers) && (
        <button
          type={'button'}
          onClick={handleGenerateAI}
          className={
            'mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700'
          }
        >
          {'AI 생성하기'}
        </button>
      )}

      {retry && (
        <div className={'mt-4'}>
          <p className={'text-red-500'}>
            {'생성에 실패했습니다. 다시 시도해주세요.'}
          </p>
          <button
            type={'button'}
            onClick={handleGenerateAI}
            className={
              'py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700'
            }
          >
            {'다시 시도하기'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BasicQuestion;
