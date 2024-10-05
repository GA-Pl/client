import { v4 as uuidv4 } from 'uuid';
import { nurriCurriculum } from '@/_lib/constants/nurriCurriculum';

interface CurriculumToggleProps {
  selectedNurri: string;
  onNurriClick: (category: string) => void;
  selectedSubNurri: string;
  onSubNurriClick: (
    subCategory: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onDetailClick: (detail: string) => void;
  selectedDetail: string;
}

const CurriculumToggle = ({
  selectedNurri,
  onNurriClick,
  selectedSubNurri,
  onSubNurriClick,
  onDetailClick,
  selectedDetail,
}: CurriculumToggleProps) => {
  return (
    <div className={'flex flex-col laptop:flex-row text-sm mt-2'}>
      <div className={'flex'}>
        <ul className={'flex flex-col'}>
          {nurriCurriculum.map((item) => {
            const category = Object.keys(item)[0];
            const isSelectedNurri = category === selectedNurri;
            return (
              <li key={uuidv4()}>
                <button
                  type={'button'}
                  onClick={() => onNurriClick(category)}
                  className={`flex justify-center items-center cursor-pointer w-32 p-2 shadow-md ${
                    isSelectedNurri
                      ? 'bg-primary100 text-slate-900'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-primary100'
                  }`}
                >
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
        {selectedNurri && (
          <ul className={'flex flex-col ml-4'}>
            {nurriCurriculum
              .find((item) => Object.keys(item)[0] === selectedNurri)
              ?.[selectedNurri].map((subItem: any) => {
                const subCategoryKey = Object.keys(subItem)[0];
                const isSelectedSubNurri = subCategoryKey === selectedSubNurri;
                return (
                  <li key={uuidv4()}>
                    <button
                      type={'button'}
                      onClick={(e) => onSubNurriClick(subCategoryKey, e)}
                      className={`flex justify-center items-center cursor-pointer w-48 p-2 hover:text-slate-900 hover:bg-primary100 shadow-md ${
                        isSelectedSubNurri
                          ? 'bg-primary100 text-slate-900'
                          : 'text-slate-700'
                      }`}
                    >
                      {subCategoryKey}
                    </button>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      {selectedSubNurri && (
        <ul className={'mt-4 laptop:mt-0 laptop:ml-4'}>
          {selectedNurri &&
            nurriCurriculum
              .find((nurri) => Object.keys(nurri)[0] === selectedNurri)
              ?.[selectedNurri].find(
                (subNurri) => Object.keys(subNurri)[0] === selectedSubNurri,
              )
              ?.[selectedSubNurri].map((detail: string) => {
                const isSelectedDetail = detail === selectedDetail;
                return (
                  <li key={uuidv4()}>
                    <button
                      type={'button'}
                      onClick={() => onDetailClick(detail)}
                      className={`flex justify-start items-center break-keep p-2 shadow-md cursor-pointer  w-72 laptop:whitespace-normal text-sm hover:text-slate-900 hover:bg-primary100 text-left ${
                        isSelectedDetail
                          ? 'bg-primary100 text-slate-900'
                          : 'text-slate-700'
                      }`}
                    >
                      {detail}
                    </button>
                  </li>
                );
              })}
        </ul>
      )}
    </div>
  );
};

export default CurriculumToggle;
