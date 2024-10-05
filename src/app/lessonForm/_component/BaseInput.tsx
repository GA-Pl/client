import Image from 'next/image';

interface BaseInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const BaseInput = ({ label, id, value, onChange }: BaseInputProps) => {
  return (
    <div>
      <div className={'flex'}>
        <div className={'flex items-center justify-center'}>
          <Image
            src={'/icons/triangle.png'}
            width={20}
            height={20}
            alt={'triangle'}
          />
        </div>
        <input
          type={'text'}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          className={
            'flex items-center justify-center mt-1 w-full px-3 py-2  focus:outline-none'
          }
        />
      </div>
    </div>
  );
};
