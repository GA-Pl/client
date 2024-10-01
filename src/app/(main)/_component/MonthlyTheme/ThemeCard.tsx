function ThemeCard({ rank, name }: { rank: number; name: string }) {
  return (
    <div
      className={
        'border bg-white p-4 rounded-lg shadow-sm flex items-center justify-between font-pretendard'
      }
    >
      <div className={'font-maple'}>{rank}</div>
      <div>{name}</div>
    </div>
  );
}

export default ThemeCard;
