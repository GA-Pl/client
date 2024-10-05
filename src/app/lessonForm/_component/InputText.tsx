interface InputTextProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const InputText = ({ label, id, value, onChange }: InputTextProps) => (
  <div className={'flex justify-center items-center'}>
    <label
      htmlFor={id}
      className={
        'flex justify-center items-center text-sm font-medium mr-1 w-8 h-8 rounded-full bg-primary100 text-gray-600'
      }
    >
      {id}
    </label>
    <input
      type={'text'}
      id={id}
      value={value}
      placeholder={label}
      onChange={(e) => onChange(e.target.value)}
      className={
        'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
      }
    />
  </div>
);
