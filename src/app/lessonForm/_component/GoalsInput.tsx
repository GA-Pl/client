interface GoalsInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const GoalsInput = ({ label, id, value, onChange }: GoalsInputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={'flex justify-between text-lg text-slate-400 border-b mt-2'}
      >
        {label}
      </label>
      <input
        type={'text'}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={
          'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
        }
      />
    </div>
  );
};
