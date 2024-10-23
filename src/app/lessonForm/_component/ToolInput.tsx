interface ToolInputProps {
  label: string;
  id: string;
  value: string;
  number: number | string;
  onChange: (value: string) => void;
  onEnterPress: () => void;
  inputRef?: (instance: HTMLInputElement | null) => void;
}

export const ToolInput = ({
  label,
  id,
  value,
  number,
  onChange,
  onEnterPress,
  inputRef,
}: ToolInputProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onEnterPress();
      event.preventDefault();
    }
  };

  return (
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
        ref={inputRef}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={
          'mt-1 block w-16 laptop:w-20 desktop:w-32 px-3 py-2 border text-xs laptop:text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
        }
      />
    </div>
  );
};
