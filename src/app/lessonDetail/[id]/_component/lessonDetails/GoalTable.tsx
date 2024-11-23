interface GoalTableProps {
  title: string;
  children: React.ReactNode;
}

const GoalTable = ({ title, children }: GoalTableProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold my-2'}>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default GoalTable;
