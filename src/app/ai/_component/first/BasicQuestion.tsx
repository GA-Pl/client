import React, { useState, useCallback, useEffect } from 'react';
import { category } from '@/_lib/constants/category';
import { age } from '@/_lib/constants/age';
import { groupSize } from '@/_lib/constants/groupSize';
import { theme } from '@/_lib/constants/theme';
import { recommendation } from '@/_lib/constants/recommendation';
import { Options, Option, BasicQuestionProps } from '@/types/ai';
import TypingEffect from '../motion/TypingEffect';
import InputField from '../InputField';
import SubmitButton from '../SubmitButton';
import AnswerDisplay from './AnswerDisplay';
import AIActionDisplay from './AIActionDisplay';
import OptionSelector from '../motion/OptionSelector';

const BasicQuestion = ({
  currentStep,
  setCurrentStep,
  questions,
  questionKeys,
}: BasicQuestionProps) => {
  const [inputValue, setInputValue] = useState('');
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showInput, setShowInput] = useState(false);

  const options = { age, groupSize, theme, category, recommendation };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [],
  );

  const handleNextStep = () => {
    const key = questionKeys[currentStep - 1];
    setAnswers((prev) => ({
      ...prev,
      [key]: inputValue,
    }));
    setInputValue('');
    if (currentStep < questionKeys.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleOptionSelect = (option: Option) => {
    const key = questionKeys[currentStep - 1];
    setAnswers((prev) => ({
      ...prev,
      [key]: option.value,
    }));
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInput(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditAnswer = (index: number) => {
    const key = questionKeys[index];
    setCurrentStep(index + 1);
    setInputValue(answers[key]);
  };

  const currentKey = questionKeys[currentStep - 1] as keyof Options;
  const currentOptions = options[currentKey];
  const hasImages = currentOptions.some((option: Option) => option.image);
  console.log('hasImages', hasImages);

  const areAllQuestionsAnswered =
    questionKeys.length === Object.keys(answers).length + 1;

  const handleGenerateAI = () => {
    console.log('AI 생성하기');
    if (currentStep < questionKeys.length) {
      setCurrentStep(6);
    }
  };

  return (
    <div className={'flex flex-col items-center'}>
      <TypingEffect text={questions[questionKeys[currentStep - 1]]} />
      <div className={'mt-4'}>
        {showInput && !hasImages && (
          <div className={'flex m-4'}>
            <InputField
              value={inputValue}
              onChange={handleInputChange}
              placeholder={'직접 쓰기'}
            />
            <SubmitButton onClick={handleNextStep} label={'등록'} />
          </div>
        )}
        <OptionSelector
          options={currentOptions}
          onOptionSelect={handleOptionSelect}
          hasImages={hasImages}
        />
      </div>
      <AnswerDisplay
        answers={answers}
        questions={questions}
        onEditAnswer={handleEditAnswer}
      />
      {areAllQuestionsAnswered && (
        <AIActionDisplay onGenerateAI={handleGenerateAI} />
      )}
    </div>
  );
};

export default BasicQuestion;
