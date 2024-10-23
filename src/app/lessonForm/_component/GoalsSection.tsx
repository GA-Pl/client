import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef, useState } from 'react';
import { InputText } from './InputText';

interface Goal {
  id: string;
  text: string;
}

interface GoalsSectionProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}

const GoalsSection = ({ goals, setGoals }: GoalsSectionProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const addGoal = () => {
    if (goals.length < 5 && !isAdding) {
      setIsAdding(true);
      setTimeout(() => {
        setGoals((prevGoals) => [...prevGoals, { id: uuidv4(), text: '' }]);
        setIsAdding(false);
      }, 50);
    }
  };

  const handleGoalChange = (id: string, value: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, text: value } : goal,
      ),
    );
  };

  useEffect(() => {
    const lastInput = inputRefs.current[goals.length - 1];
    if (lastInput) {
      lastInput.focus();
    }
  }, [goals.length]);

  return (
    <>
      <h1 className={'title-effect'}>{'활동 목표'}</h1>
      <div>
        {goals.map((goal, index) => (
          <InputText
            key={goal.id}
            id={`${index + 1}`}
            value={goal.text}
            onChange={(value) => handleGoalChange(goal.id, value)}
            onEnterPress={addGoal}
            inputRef={(el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            }}
          />
        ))}
        {goals.length < 5 && (
          <button
            type={'button'}
            onClick={addGoal}
            className={
              'mt-2 bg-primary500 hover:bg-primary text-white font-bold py-2 px-4 rounded'
            }
          >
            {'+'}
          </button>
        )}
      </div>
    </>
  );
};

export default GoalsSection;
