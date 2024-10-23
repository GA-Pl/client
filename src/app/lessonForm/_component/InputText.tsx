interface InputTextProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onEnterPress: () => void;
  inputRef?: (instance: HTMLInputElement | null) => void;
}

export const InputText = ({
  id,
  value,
  onChange,
  onEnterPress,
  inputRef,
}: InputTextProps) => {
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
          'flex justify-center items-center text-sm font-medium mr-1 w-8 h-8 rounded-full bg-primary100 text-gray-600'
        }
      >
        {id}
      </label>
      <input
        type={'text'}
        id={id}
        value={value}
        ref={inputRef}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={
          'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
        }
      />
    </div>
  );
};
