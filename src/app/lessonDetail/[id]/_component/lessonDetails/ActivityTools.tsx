import { v4 as uuidv4 } from 'uuid';

interface ActivityToolProps {
  tools: string[];
}

const ActivityTool = ({ tools }: ActivityToolProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold mb-4'}>{'활동 도구'}</h2>
      <div
        className={
          'grid laptop:gap-4 gap-2 grid-cols-3 laptop:grid-cols-4 text-xs laptop:text-xs'
        }
      >
        {tools.map((tool) => (
          <span
            key={uuidv4()}
            className={
              'bg-slate-700 text-white rounded-md py-2 px-4 text-center'
            }
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ActivityTool;
