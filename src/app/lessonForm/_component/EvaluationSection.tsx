import { InputText } from './InputText';

interface EvaluationsSectionProps {
  evaluations: string[];
  setEvaluations: React.Dispatch<React.SetStateAction<string[]>>;
}

const EvaluationsSection = ({
  evaluations,
  setEvaluations,
}: EvaluationsSectionProps) => {
  const addEvaluation = () => {
    if (evaluations.length < 3) {
      setEvaluations([...evaluations, '']);
    }
  };

  const handleEvaluationChange = (index: number, value: string) => {
    const newEvaluations = [...evaluations];
    newEvaluations[index] = value;
    setEvaluations(newEvaluations);
  };

  return (
    <>
      <h1 className={'title-effect'}>{'평가'}</h1>
      <div>
        {evaluations.map((evaluation, index) => (
          <InputText
            key={evaluation}
            label={`평가 ${index + 1}`}
            id={`${index + 1}`}
            value={evaluation}
            onChange={(value) => handleEvaluationChange(index, value)}
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
