import ThemeCard from './ThemeCard';

function MonthlyTheme() {
  const data = [
    { rank: 1, name: '한글날' },
    { rank: 2, name: '가을 탐험' },
    { rank: 3, name: '할로윈' },
    { rank: 4, name: '곤충과 자연' },
    { rank: 5, name: '가을 농작물' },
  ];
  return (
    <div>
      <h2 className={'mb-4 font-bold'}>{'🔥 10월 뜨는 주제'}</h2>
      <div>
        {data.map((theme) => (
          <ThemeCard key={theme.rank} rank={theme.rank} name={theme.name} />
        ))}
      </div>
    </div>
  );
}

export default MonthlyTheme;
