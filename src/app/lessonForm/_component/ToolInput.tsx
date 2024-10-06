interface ToolInputProps {
  label: string;
  id: string;
  value: string;
  number: number | string;
  onChange: (value: string) => void;
}

export const ToolInput = ({
  label,
  id,
  value,
  number,
  onChange,
}: ToolInputProps) => (
  <div className={'flex justify-center items-center'}>
    <label
      htmlFor={id}
      className={
        'flex justify-center items-center text-xs w-4 h-4 laptop:w-6 laptop:h-6 font-medium mr-1 rounded-full bg-primary100 text-gray-600'
      }
    >
      {number}
    </label>
    <input
      type={'text'}
      id={id}
      value={value}
      placeholder={label}
      onChange={(e) => onChange(e.target.value)}
      className={
        'mt-1 block w-16 laptop:w-20 desktop:w-32 px-3 py-2 border text-xs laptop:text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
      }
    />
  </div>
);
