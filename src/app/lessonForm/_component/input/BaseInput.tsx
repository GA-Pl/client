interface BaseInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const BaseInput = ({ label, id, value, onChange }: BaseInputProps) => {
  const labelNumber = label.match(/\d+/)?.[0];

  return (
    <div>
      <div className={'flex'}>
        <div className={'flex items-center justify-center text-xs text-nowrap'}>
          {labelNumber} {'.'}
        </div>
        <input
          type={'text'}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          className={
            'flex items-center justify-center mt-1 ml-2 w-full px-3 py-2 text-lg font-medium border border-slate-300 rounded-md focus:outline-primary'
          }
        />
      </div>
    </div>
  );
};
