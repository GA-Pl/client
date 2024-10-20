import React from 'react';

interface AnswerDisplayProps {
  answers: { [key: string]: string };
  questions: { [key: string]: string };
  onEditAnswer: (index: number) => void;
}

const AnswerDisplay = ({
  answers,
  questions,
  onEditAnswer,
}: AnswerDisplayProps) => {
  return (
    <div className={'mt-4 mb-16'}>
      {Object.entries(answers).map(([key, value], index) => (
        <div
          key={key}
          onClick={() => onEditAnswer(index)}
          className={
            'cursor-pointer p-2 rounded bg-slate-100 hover:bg-slate-200 mt-2'
          }
        >
          <span className={'font-semibold text-slate-600'}>
            {questions[key]}
          </span>{' '}
          {value}
        </div>
      ))}
    </div>
  );
};

export default AnswerDisplay;
