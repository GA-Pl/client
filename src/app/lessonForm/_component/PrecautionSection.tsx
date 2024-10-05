import { InputText } from './InputText';

interface PrecautionsSectionProps {
  precautions: string[];
  setPrecautions: React.Dispatch<React.SetStateAction<string[]>>;
}

const PrecautionsSection = ({
  precautions,
  setPrecautions,
}: PrecautionsSectionProps) => {
  const addPrecaution = () => {
    if (precautions.length < 3) {
      setPrecautions([...precautions, '']);
    }
  };

  const handlePrecautionChange = (index: number, value: string) => {
    const newPrecautions = [...precautions];
    newPrecautions[index] = value;
    setPrecautions(newPrecautions);
  };

  return (
    <>
      <h1 className={'title-effect'}>{'유의사항'}</h1>
      <div>
        {precautions.map((precaution, index) => (
          <InputText
            key={precaution}
            label={`유의사항 ${index + 1}`}
            id={`${index + 1}`}
            value={precaution}
            onChange={(value) => handlePrecautionChange(index, value)}
          />
        ))}
        {precautions.length < 3 && (
          <button
            type={'button'}
            onClick={addPrecaution}
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

export default PrecautionsSection;
