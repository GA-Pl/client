interface SubjectInputSectionProps {
  subject: string;
  detailSubject: string;
  onSubjectChange: (value: string) => void;
  onDetailSubjectChange: (value: string) => void;
}

const SubjectInputSection = ({
  subject,
  detailSubject,
  onSubjectChange,
  onDetailSubjectChange,
}: SubjectInputSectionProps) => {
  return (
    <div className={'flex flex-col laptop:flex-row w-100'}>
      <input
        placeholder={'주제'}
        name={'subject'}
        value={subject}
        onChange={(e) => onSubjectChange(e.target.value)}
        className={
          'border-l-4 border-l-slate-500 p-4 w-full laptop:w-1/2 h-10 focus:outline-none'
        }
      />
      <input
        placeholder={'세부 주제'}
        name={'detail_subject'}
        value={detailSubject}
        onChange={(e) => onDetailSubjectChange(e.target.value)}
        className={
          'border-l-4 border-l-slate-500 p-4 mt-4 laptop:mt-0 laptop:ml-4 w-full laptop:w-1/2 h-10 focus:outline-none'
        }
      />
    </div>
  );
};

export default SubjectInputSection;
