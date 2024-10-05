interface Option {
  label: string;
  value: string;
  image: string;
}

interface SelectInputProps {
  label: string;
  id: string;
  value: string;
  options: Option[];
  onChange: (value: string, image?: string) => void;
}
export const SelectInput = ({
  label,
  id,
  value,
  options,
  onChange,
}: SelectInputProps) => (
  <div>
    <label htmlFor={id} className={'block text-sm font-medium text-gray-700'}>
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={(e) => {
        const selectedOption = options.find(
          (option) => option.value === e.target.value,
        );
        if (selectedOption) {
          onChange(selectedOption.value, selectedOption.image);
        }
      }}
      className={
        'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
      }
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
