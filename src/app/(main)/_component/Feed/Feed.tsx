import Link from 'next/link';
import Image from 'next/image';
import { IFeed } from '@/types/feed';
import ImageCarousel from './ImageCarousel';

interface ExtendedIFeed extends IFeed {
  additionalProperty?: string;
}

interface FeedProps {
  feed: ExtendedIFeed;
}

export default function Feed({ feed }: FeedProps) {
  return (
    <div
      className={
        'mx-auto my-4 max-w-xs tablet:max-w-sm laptop:max-w-md desktop:max-w-lg font-pretendard'
      }
    >
      <div className={'flex items-center mb-4'}>
        <div
          className={
            'w-10 laptop:w-12 laptop:h-12 h-10 rounded-full tablet:w-8 tablet:h-8'
          }
          style={{
            backgroundImage: `url('images/ham.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
          }}
        />

        <div className="ml-2">
          <div>
            <strong>우사기</strong>님의{' '}
            <span className={'text-primary'}>교육계획안</span>이 올라왔어요!
          </div>
          <div className={'text-slate-500 text-xs'}>
            <span>새싹 교사</span>
            <span className={'text-slate-400 ml-4'}>15분 전</span>
          </div>
        </div>
      </div>
      <div
        key={feed.document_id}
        className={'bg-white border rounded-lg overflow-hidden'}
      >
        <div className={'p-4'}>
          <h1 className={'text-xl font-bold'}>{feed.activity_plan.title}</h1>

          <div className={'flex items-center'}>
            <div className="flex space-x-2">
              {feed.activity_plan.subject.map((sub) => (
                <h3
                  key={sub}
                  className="mt-2 mb-2 text-sm text-slate-100 bg-slate-400 rounded-full px-4 py-1 font-thin"
                >
                  {sub}
                </h3>
              ))}
            </div>
            <Link
              href={'/lessonDetail/3'}
              className={
                'ml-auto text-primary400 hover:text-primary600 button-effect'
              }
            >
              더보기
            </Link>
          </div>

          {feed.activity_plan.activity_content.map(
            (content: { subtitle: string; content: string }) => (
              <div key={content.subtitle}>
                <h4 className={'font-semibold'}>{content.subtitle}</h4>
                <p>{content.content}</p>
              </div>
            ),
          )}
        </div>
        <div className={'p-4 border-t'}>
          <ImageCarousel images={feed.activity_record.image} />
        </div>
        <div className={'p-4 flex justify-between itemss-center'}>
          <div className={'flex flex-col'}>
            <div className={'flex flex-row'}>
              <button
                type={'button'}
                className={`heart ${feed.is_liked ? 'text-red-500' : 'text-gray-400'}`}
              >
                <Image
                  src={'/icons/heartIconPink.png'}
                  width={12}
                  height={12}
                  alt={'heart'}
                />
                {feed.is_liked ? 'Liked' : 'Like'}
              </button>
            </div>
            <span>{'54명의 선생님이 좋아해주셨습니다!'}</span>
          </div>
          <span className={'text-slate-600'}>
            {'🔖 '}
            {feed.bookmark_count} {'명의 선생님들이 찜했어요!'}
          </span>
        </div>
      </div>
    </div>
  );
}
