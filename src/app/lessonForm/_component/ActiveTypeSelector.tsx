import { SelectInput } from './SelectInput';

const activityOptions = [
  { label: '이야기나누기', value: 'storytelling' },
  { label: '동시', value: 'poetry' },
  { label: '게임', value: 'game' },
  { label: '동극', value: 'play' },
  { label: '노래', value: 'sing' },
  { label: '신체활동', value: 'workout' },
  { label: '미술', value: 'art' },
];

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ActivityTypeSelector = ({ value, onChange }: InputProps) => (
  <SelectInput
    label={'활동유형'}
    id={'activityType'}
    value={value}
    options={activityOptions}
    onChange={onChange}
  />
);
