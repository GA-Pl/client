import { v4 as uuidv4 } from 'uuid';

interface ActivityToolProps {
  tools: string[];
}

const ActivityTool = ({ tools }: ActivityToolProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold'}>{'활동 도구'}</h2>
      <div className={'flex list-disc list-inside'}>
        {tools.map((tool) => (
          <span
            key={uuidv4()}
            className={'bg-gray-700 text-white mt-2 mr-2 px-4 rounded-full'}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ActivityTool;
