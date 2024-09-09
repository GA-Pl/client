import { v4 as uuidv4 } from 'uuid';

interface ActivityToolProps {
  tools: string[];
}

const ActivityTool = ({ tools }: ActivityToolProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold'}>{'활동 도구'}</h2>
      <ul className={'list-disc list-inside'}>
        {tools.map((tool) => (
          <li key={uuidv4()} className={'text-gray-700 mt-2'}>
            {tool}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityTool;
