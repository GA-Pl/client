import Link from 'next/link';
import ActionButtons from '@/_component/Item/ActionButtons';
import { IFeed } from '@/types/feed';
import { useSession } from 'next-auth/react';
import formatRelativeTime from '../../_lib/formatRelativeTime';
import PlanFeed from './PlanFeed';
import LogFeed from './LogFeed';
import PlanCommentSection from './PlanCommentSection';
import LogCommentSection from './LogCommentSection';

interface FeedProps {
  feed: IFeed;
}

export default function Feed({ feed }: FeedProps) {
  const { data: session } = useSession();

  if (!session) {
    console.error('No session available, user might not be logged in');
    return <div>{'유저 정보가 존재하지 않습니다'}</div>;
  }

  return (
    <div
      className={
        'mx-auto my-4 max-w-xs tablet:max-w-sm laptop:max-w-md desktop:max-w-lg font-pretendard'
      }
    >
      <Link href={`/profile/${feed.authorId}/plan`}>
        <div className={'flex items-center mb-4'}>
          <div
            className={'w-10 h-10 laptop:w-12 laptop:h-12 rounded-full'}
            style={{
              backgroundImage: `url(${feed.authorThumbnailImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
            }}
          />
          <div className={'ml-2'}>
            <strong>{feed.authorNickname}</strong>
            <span className={'text-slate-600'}>
              {'의'}
              <strong className={'text-primary ml-1'}>
                {feed.type === 'PLAN' ? '교육계획안' : '기록'}
              </strong>
              {'이 올라왔어요!'}
            </span>
            <div className={'text-slate-500 text-xs'}>
              {formatRelativeTime(feed.createdAt)}
            </div>
          </div>
        </div>
      </Link>
      <div
        key={feed.id}
        className={
          'bg-slate-200 shadow-md rounded-lg overflow-hidden cursor-pointer'
        }
      >
        {feed.type === 'PLAN' ? (
          <PlanFeed plan={feed} />
        ) : (
          <LogFeed log={feed} />
        )}

        <div className={'px-4 pb-2'}>
          <ActionButtons
            like={feed.liked_count}
            comment={feed.comments.length}
            scrap={feed.bookmark_count}
            isLiked={feed.liked}
            isBookmarked={feed.bookmarked}
            postId={feed.id}
          />
        </div>

        {feed.type === 'PLAN' ? (
          <PlanCommentSection comments={feed.comments} />
        ) : (
          <LogCommentSection
            postId={feed.id}
            accessToken={session.accessToken}
          />
        )}
      </div>
    </div>
  );
}
