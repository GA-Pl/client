interface SelectInputProps {
  label: string;
  id: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
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
      onChange={(e) => onChange(e.target.value)}
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
