import ButtonSpinner from '@/_component/Spinner/ButtonSpinner';

interface SaveButtonsProps {
  onSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onTempSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isSaving: boolean;
}

const SaveButtons = ({ onSave, onTempSave, isSaving }: SaveButtonsProps) => {
  return (
    <div className={'flex justify-end'}>
      <button
        type={'button'}
        onClick={onTempSave}
        className={
          'py-2 px-4 rounded hover:bg-slate-100 text-primary w-24 h-12'
        }
        disabled={isSaving}
      >
        {'임시저장'}
      </button>
      <button
        type={'button'}
        onClick={onSave}
        className={
          'button-border py-2 px-4 bg-primary text-white rounded hover:bg-primary700 ml-2 w-24 h-12'
        }
        disabled={isSaving}
      >
        {isSaving ? <ButtonSpinner /> : '저장하기'}
      </button>
    </div>
  );
};

export default SaveButtons;
