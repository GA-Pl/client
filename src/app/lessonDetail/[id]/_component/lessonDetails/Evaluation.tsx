import { v4 as uuidv4 } from 'uuid';

interface EvaluationProps {
  evaluations: string[];
}

const Evaluation = ({ evaluations }: EvaluationProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold'}>{'평가 기준'}</h2>
      <ul className={'list-disc list-inside'}>
        {evaluations.map((evaluation) => (
          <li key={uuidv4()} className={'text-gray-700 mt-2'}>
            {evaluation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Evaluation;
