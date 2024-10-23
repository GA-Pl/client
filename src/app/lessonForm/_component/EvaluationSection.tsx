import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef, useState } from 'react';
import { InputText } from './InputText';

interface Evaluation {
  id: string;
  text: string;
}

interface EvaluationsSectionProps {
  evaluations: Evaluation[];
  setEvaluations: React.Dispatch<React.SetStateAction<Evaluation[]>>;
}

const EvaluationsSection = ({
  evaluations,
  setEvaluations,
}: EvaluationsSectionProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const addEvaluation = () => {
    if (evaluations.length < 3 && !isAdding) {
      setIsAdding(true);
      setTimeout(() => {
        setEvaluations((prevEvaluations) => [
          ...prevEvaluations,
          { id: uuidv4(), text: '' },
        ]);
        setIsAdding(false);
      }, 50);
    }
  };

  const handleEvaluationChange = (id: string, value: string) => {
    setEvaluations((prevEvaluations) =>
      prevEvaluations.map((evaluation) =>
        evaluation.id === id ? { ...evaluation, text: value } : evaluation,
      ),
    );
  };

  useEffect(() => {
    const lastInput = inputRefs.current[evaluations.length - 1];
    if (lastInput) {
      lastInput.focus();
    }
  }, [evaluations.length]);

  return (
    <>
      <h1 className={'title-effect'}>{'평가'}</h1>
      <div>
        {evaluations.map((evaluation, index) => (
          <InputText
            key={evaluation.id}
            id={`${index + 1}`}
            value={evaluation.text}
            onChange={(value) => handleEvaluationChange(evaluation.id, value)}
            onEnterPress={addEvaluation}
            inputRef={(el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            }}
          />
        ))}
        {evaluations.length < 3 && (
          <button
            type={'button'}
            onClick={addEvaluation}
            className={
              'flex mr-auto ml-auto mt-2 bg-primary text-white font-bold py-2 px-4 rounded'
            }
          >
            {'+'}
          </button>
        )}
      </div>
    </>
  );
};

export default EvaluationsSection;
