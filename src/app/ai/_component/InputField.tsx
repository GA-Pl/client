interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

function InputField({ value, onChange, placeholder }: InputFieldProps) {
  return (
    <div className={'flex flex-col '}>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={
          'px-4 py-2 border border-gray-300 focus:border-primary500 focus:outline-none focus:ring-1 focus:ring-primary500 rounded-md shadow-sm'
        }
      />
    </div>
  );
}

export default InputField;
