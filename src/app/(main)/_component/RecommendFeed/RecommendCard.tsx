import Image from 'next/image';

interface RecommendCardProps {
  profileImg: string;
  name: string;
  title: string;
  sentence: string;
  like: number;
}

function RecommendCard({
  profileImg,
  name,
  title,
  sentence,
  like,
}: RecommendCardProps) {
  return (
    <div
      className={
        'bg-white p-4 shadow rounded-lg mb-4 flex items-center space-x-4'
      }
    >
      <Image
        src={profileImg}
        alt={name}
        className={'w-10 h-10 rounded-full'}
        width={100}
        height={100}
      />
      <div className={'flex-1'}>
        <h3 className={'font-semibold'}>{title}</h3>
        <p>{sentence}</p>
      </div>
      <div className={'text-gray-600'}>
        {'👍 '}
        {like}
      </div>
    </div>
  );
}

export default RecommendCard;
