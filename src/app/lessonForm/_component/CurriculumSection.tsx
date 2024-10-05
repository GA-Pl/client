import Image from 'next/image';
import CurriculumToggle from './CurriculumToggle';

interface CurriculumSectionProps {
  curriculumComponents: any[];
  handleNurriClick: (index: number, nurri: string) => void;
  handleSubNurriClick: (
    index: number,
    subNurri: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  handleDetailClick: (index: number, detail: string) => void;
  removeCurriculumComponent: (index: number) => void;
  addCurriculumComponent: () => void;
  canAddMore: boolean;
}

const CurriculumSection = ({
  curriculumComponents,
  handleNurriClick,
  handleSubNurriClick,
  handleDetailClick,
  removeCurriculumComponent,
  addCurriculumComponent,
  canAddMore,
}: CurriculumSectionProps) => {
  return (
    <div>
      <div>
        <h1 className={'title-effect'}>{'누리과정 관련요소'}</h1>
      </div>
      {curriculumComponents.map((component, index) => (
        <div key={component}>
          <div
            className={
              'flex justify-between text-lg text-slate-400 border-b mt-6'
            }
          >
            {'누리과정 요소 '}
            {typeof index === 'number' ? index + 1 : null}
            {curriculumComponents.length !== 1 && (
              <button
                type={'button'}
                className={
                  'flex justify-center items-center rounded-full hover:bg-primary100 w-8 h-8'
                }
                onClick={() => removeCurriculumComponent(index)}
              >
                <Image
                  src={'/icons/deletetrash.png'}
                  width={16}
                  height={16}
                  alt={'delete'}
                />
              </button>
            )}
          </div>
          <CurriculumToggle
            selectedNurri={component.selectedNurri}
            onNurriClick={(nurri) => handleNurriClick(index, nurri)}
            selectedSubNurri={component.selectedSubNurri}
            onSubNurriClick={(subNurri, event) =>
              handleSubNurriClick(index, subNurri, event)
            }
            onDetailClick={(detail) => handleDetailClick(index, detail)}
            selectedDetail={component.selectedCurriculum}
          />
        </div>
      ))}
      {canAddMore && (
        <button
          type={'button'}
          className={
            'ml-auto mr-auto mt-2 bg-primary400 hover:bg-primary text-white font-thin py-2 px-4 rounded'
          }
          onClick={addCurriculumComponent}
        >
          {'누리과정 요소 추가'}
        </button>
      )}
    </div>
  );
};

export default CurriculumSection;
