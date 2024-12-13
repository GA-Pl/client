import { AnimatePresence } from 'framer-motion';
import ThemeCard from './ThemeCard';

function MonthlyTheme() {
  const data = [
    { rank: 1, name: '겨울 풍경' },
    { rank: 2, name: '동물들의 겨울 준비' },
    { rank: 3, name: '겨울 축제 여행' },
    { rank: 4, name: '산타와 친구들' },
    { rank: 5, name: '겨울 스포츠 체험' },
  ];
  return (
    <div>
      <h2 className={'my-4 font-bold'}>{'🔥 12월 뜨는 주제'}</h2>
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
