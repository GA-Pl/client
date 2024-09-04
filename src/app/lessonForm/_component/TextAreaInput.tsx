interface TextAreaInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const TextAreaInput = ({
  label,
  id,
  value,
  onChange,
}: TextAreaInputProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
    />
  </div>
);
