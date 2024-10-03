import Image from 'next/image';

function Category() {
  const ACTIVITY_CATEGORY = [
    { name: '요리', img: '/images/category/cook.png' },
    { name: '음악감상', img: '/images/category/musiclisten.png' },
    { name: '노래 부르기', img: '/images/category/sing.png' },
    { name: '악기 연주', img: '/images/category/playInstrument.png' },
    { name: '동극', img: '/images/category/musical.png' },
    { name: '신체표현', img: '/images/category/bodyExpression.png' },
    { name: '미술', img: '/images/category/art.png' },
    { name: '미술 감상', img: '/images/category/artWatch.png' },
    { name: '동시', img: '/images/category/poetry.png' },
    { name: '게임', img: '/images/category/game.png' },
    { name: '이야기 나누기', img: '/images/category/talk.png' },
    { name: '과학•실험', img: '/images/category/science.png' },
  ];

  return (
    <div className={'mt-4 p-4'}>
      <div className={'grid grid-cols-4 md:grid-cols-6 gap-4'}>
        {ACTIVITY_CATEGORY.map((activity) => (
          <div
            key={activity.name}
            className={'flex flex-col items-center text-center'}
          >
            <Image
              src={activity.img}
              alt={activity.name}
              width={60}
              height={60}
              className={'rounded-xl button-effect shadow-md shadow-slate-300'}
            />
            <p className={'mt-2 text-slate-600 font-pretendard'}>
              {activity.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Category;
