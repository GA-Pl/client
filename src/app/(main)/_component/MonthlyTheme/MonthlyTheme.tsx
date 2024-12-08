import { AnimatePresence } from 'framer-motion';
import ThemeCard from './ThemeCard';

function MonthlyTheme() {
  const data = [
    { rank: 1, name: '가을' },
    { rank: 2, name: '단풍' },
    { rank: 3, name: '가을 소풍' },
    { rank: 4, name: '바람' },
    { rank: 5, name: '가을 농작물' },
  ];
  return (
    <div>
      <h2 className={'my-4 font-bold'}>{'🔥 11월 뜨는 주제'}</h2>
      <div>
        <AnimatePresence>
          {data.map((theme) => (
            <ThemeCard key={theme.rank} rank={theme.rank} name={theme.name} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MonthlyTheme;
