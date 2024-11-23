import { v4 as uuidv4 } from 'uuid';

import React from 'react';

interface PrecautionProps {
  precautions: string[];
}

const Precaution = ({ precautions }: PrecautionProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold'}>{'유의 사항'}</h2>
      <ul className={'list-disc list-inside'}>
        {precautions.map((precaution) => (
          <li key={uuidv4()} className={'text-gray-700 mt-2'}>
            {precaution}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Precaution;
