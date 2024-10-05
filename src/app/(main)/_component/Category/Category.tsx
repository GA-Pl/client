import Image from 'next/image';
import { category } from '@/_lib/constants/category';

function Category() {
  return (
    <div className={'mt-4 p-4'}>
      <div className={'grid grid-cols-4 md:grid-cols-6 gap-4'}>
        {category.map((activity) => (
          <div
            key={activity.name}
            className={'flex flex-col items-center text-center'}
          >
            <Image
              src={activity.image}
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
