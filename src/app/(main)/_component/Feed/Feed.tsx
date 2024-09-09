import Link from 'next/link';
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
        'mx-auto my-4 max-w-xs tablet:max-w-sm laptop:max-w-md desktop:max-w-lg'
      }
    >
      <div
        key={feed.document_id}
        className={'bg-white border rounded-lg overflow-hidden'}
      >
        <div className={'p-4'}>
          <h2 className={'font-bold'}>{feed.activity_plan.title}</h2>

          {feed.activity_plan.subject.map((sub: string) => (
            <h3 key={sub} className={'text-sm text-gray-500'}>
              {sub}
            </h3>
          ))}

          {feed.activity_plan.activity_content.map(
            (content: { subtitle: string; content: string }) => (
              <div key={content.subtitle}>
                <h4 className={'font-semibold'}>{content.subtitle}</h4>
                <p>{content.content}</p>
              </div>
            ),
          )}
          {feed.activity_plan.file.map(
            (file: { url: string; type: string }) => (
              <a
                key={file.url}
                href={file.url}
                className={'text-blue-500 text-sm'}
              >
                {'Attached File'}
              </a>
            ),
          )}
        </div>
        <div className={'p-4 border-t'}>
          <p>{feed.activity_record.content}</p>
          <ImageCarousel images={feed.activity_record.image} />
          {feed.activity_record.file.map(
            (file: { url: string; type: string }) => (
              <a
                key={file.url}
                href={file.url}
                className={'text-blue-500 text-sm'}
              >
                {'Download Record File'}
              </a>
            ),
          )}
        </div>
        <div className={'p-4 flex justify-between itemss-center'}>
          <button
            type={'button'}
            className={`heart ${feed.is_liked ? 'text-red-500' : 'text-gray-400'}`}
          >
            {'❤️ '}
            {feed.is_liked ? 'Liked' : 'Like'}
          </button>
          <span>
            {'🔖 '}
            {feed.bookmark_count} {'Bookmarks'}
          </span>
        </div>
        <div className={'p-4 text-left'}>
          <Link href={`/lessonDetail/${feed.document_id}`}>
            <span className={'text-blue-500 text-sm underline'}>
              {'더보기'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
