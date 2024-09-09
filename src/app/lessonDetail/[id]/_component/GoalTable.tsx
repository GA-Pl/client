interface GoalTableProps {
  title: string;
  children: React.ReactNode;
}

const GoalTable = ({ title, children }: GoalTableProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold'}>{title}</h2>
      <table className={'w-full my-2 text-md text-left text-gray-800'}>
        <tbody className={'bg-white divide-y divide-gray-300'}>
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default GoalTable;
