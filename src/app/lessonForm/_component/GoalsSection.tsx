import React from 'react';
import { GoalsInput } from './GoalsInput';

interface GoalsSectionProps {
  goals: string[];
  setGoals: React.Dispatch<React.SetStateAction<string[]>>;
}

const GoalsSection = ({ goals, setGoals }: GoalsSectionProps) => {
  const addGoal = () => {
    if (goals.length < 5) {
      setGoals([...goals, '']);
    }
  };

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  return (
    <>
      <h1 className={'title-effect'}>{'활동 목표'}</h1>
      <div>
        {goals.map((goal, index) => (
          <GoalsInput
            key={`goal ${index + 1}`}
            label={`목표 ${index + 1}`}
            id={`goal-${index}`}
            value={goal}
            onChange={(value) => handleGoalChange(index, value)}
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
