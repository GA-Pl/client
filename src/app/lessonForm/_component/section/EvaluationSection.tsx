import { useEffect } from 'react';
import ItemSection from './ItemSection';

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ItemSection
      title={'평가'}
      items={evaluations}
      setItems={setEvaluations}
      maxItems={3}
    />
  );
};

export default EvaluationsSection;
