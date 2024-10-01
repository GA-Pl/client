import Image from 'next/image';

function Category() {
  const ACTIVITY_CATEGORY = [
    { name: '이야기 나누기', img: '/images/category/talk.JPG' },
    { name: '동시', img: '/images/category/talk.JPG' },
    { name: '동화', img: '/images/category/talk.JPG' },
    { name: '동극', img: '/images/category/talk.JPG' },
    { name: '신체활동', img: '/images/category/talk.JPG' },
    { name: '게임', img: '/images/category/talk.JPG' },
    { name: '음악', img: '/images/category/talk.JPG' },
    { name: '노래', img: '/images/category/talk.JPG' },
    { name: '과학', img: '/images/category/talk.JPG' },
  ];

  return (
    <div className="mt-4 p-4">
      <div className="grid grid-cols-2 md:grid-cols-9 gap-4">
        {ACTIVITY_CATEGORY.map((activity) => (
          <div
            key={activity.name}
            className="flex flex-col items-center text-center"
          >
            <Image
              src={activity.img}
              alt={activity.name}
              width={60}
              height={60}
              className="rounded-xl button-effect shadow-md shadow-slate-300"
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
