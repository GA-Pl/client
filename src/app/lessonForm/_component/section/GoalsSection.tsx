import ItemSection from './ItemSection';

interface Goal {
  id: string;
  text: string;
}

interface GoalsSectionProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}

const GoalsSection = ({ goals, setGoals }: GoalsSectionProps) => {
  return (
    <ItemSection
      title={'활동 목표'}
      items={goals}
      setItems={setGoals}
      maxItems={5}
    />
  );
};

export default GoalsSection;
