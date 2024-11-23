interface AIActionDisplayProps {
  onGenerateAI: () => void;
}

const AIActionDisplay = ({ onGenerateAI }: AIActionDisplayProps) => {
  return (
    <div>
      <div
        className={
          'text-center text-sm font-semibold p-2 bg-yellow-50 text-slate-800 rounded-md shadow-md mb-2'
        }
      >
        {'위의 응답을 수정할 수 있어요!'}
      </div>
      <button
        type={'button'}
        onClick={onGenerateAI}
        className={'bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'}
      >
        {'AI 생성하기'}
      </button>
    </div>
  );
};

export default AIActionDisplay;
