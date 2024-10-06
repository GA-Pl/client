import { v4 as uuidv4 } from 'uuid';
import { ToolInput } from './ToolInput';

interface Tool {
  id: string;
  value: string;
}

interface ToolSectionProps {
  tools: Tool[];
  setTools: React.Dispatch<React.SetStateAction<Tool[]>>;
}

const ToolSection = ({ tools, setTools }: ToolSectionProps) => {
  const addTool = () => {
    if (tools.length < 10) {
      const newTool = { id: uuidv4(), value: '' };
      setTools([...tools, newTool]);
    }
  };

  const handleToolChange = (id: string, value: string) => {
    const newTools = tools.map((tool) => {
      if (tool.id === id) {
        return { ...tool, value };
      }
      return tool;
    });
    setTools(newTools);
  };

  const removeTool = (id: string) => {
    const newTools = tools.filter((tool) => tool.id !== id);
    setTools(newTools);
  };

  return (
    <>
      <h1 className={'title-effect'}>{'활동 도구'}</h1>
      <div className={'grid laptop:grid-cols-4 grid-cols-2 gap-5'}>
        {tools.map((tool, index) => (
          <div key={tool.id} className={'flex items-center space-x-2'}>
            <ToolInput
              label={`도구 ${index + 1}`}
              number={index + 1}
              id={tool.id}
              value={tool.value}
              onChange={(value) => handleToolChange(tool.id, value)}
            />
            {tools.length !== 1 && (
              <button
                type={'button'}
                onClick={() => removeTool(tool.id)}
                className={'text-slate-400 text-xs ml-2 hover:text-red-700'}
              >
                {'✕'}
              </button>
            )}
          </div>
        ))}
        {tools.length < 10 && (
          <button
            type={'button'}
            onClick={addTool}
            className={
              'flex mr-auto ml-auto mt-2 bg-primary text-white font-bold py-2 px-4 rounded'
            }
          >
            {'+'}
          </button>
        )}
      </div>
    </>
  );
};

export default ToolSection;
