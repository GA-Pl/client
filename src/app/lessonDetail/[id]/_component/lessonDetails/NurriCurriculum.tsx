import React from 'react';

interface NuriCurriculumProps {
  curriculum: { [key: string]: { [subKey: string]: string[] } };
}

const NuriCurriculum = ({ curriculum }: NuriCurriculumProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold'}>{'누리 교육과정'}</h2>
      <div className={'flex laptop:flex-row flex-col laptop:space-x-2 '}>
        {Object.entries(curriculum).map(([key, value]) => (
          <div key={key} className={'bg-gray-100 p-4 rounded mt-2'}>
            <h3 className={'font-semibold text-slate-900'}>{key}</h3>
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey}>
                <h4 className={'text-sm font-semibold text-slate-800 mt-2'}>
                  {subKey}
                </h4>
                <ul className={'list-disc pl-5 text-sm text-slate-600'}>
                  {subValue.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NuriCurriculum;
