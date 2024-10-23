import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef, useState } from 'react';
import { InputText } from './InputText';

interface Precaution {
  id: string;
  text: string;
}

interface PrecautionsSectionProps {
  precautions: Precaution[];
  setPrecautions: React.Dispatch<React.SetStateAction<Precaution[]>>;
}

const PrecautionsSection = ({
  precautions,
  setPrecautions,
}: PrecautionsSectionProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const addPrecaution = () => {
    if (precautions.length < 3 && !isAdding) {
      setIsAdding(true);
      setTimeout(() => {
        setPrecautions((prevPrecautions) => [
          ...prevPrecautions,
          { id: uuidv4(), text: '' },
        ]);
        setIsAdding(false);
      }, 50);
    }
  };

  const handlePrecautionChange = (id: string, value: string) => {
    setPrecautions((prevPrecautions) =>
      prevPrecautions.map((precaution) =>
        precaution.id === id ? { ...precaution, text: value } : precaution,
      ),
    );
  };

  useEffect(() => {
    const lastInput = inputRefs.current[precautions.length - 1];
    if (lastInput) {
      lastInput.focus();
    }
  }, [precautions.length]);

  return (
    <>
      <h1 className={'title-effect'}>{'유의사항'}</h1>
      <div>
        {precautions.map((precaution, index) => (
          <InputText
            key={precaution.id}
            id={`${index + 1}`}
            value={precaution.text}
            onChange={(value) => handlePrecautionChange(precaution.id, value)}
            onEnterPress={addPrecaution}
            inputRef={(el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            }}
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
