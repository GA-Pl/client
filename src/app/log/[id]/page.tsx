'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import RecordSwiper from '@/app/profile/[id]/record/_component/RecordSwiper';
import CommentSection from '@/app/lessonDetail/[id]/_component/commentSection/CommentSection';
import Dots from '@/app/lessonDetail/[id]/_component/buttonSection/Dots';
import { getLog } from '../_lib/getLog';

export default function LogDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    data: logData,
    isLoading,
    isError,
  } = useQuery(
    ['logData', params.id],
    () => getLog(Number(params.id), session?.accessToken || ''),
    {
      enabled: status === 'authenticated',
      retry: 2,
    },
  );

  if (status === 'unauthenticated') {
    return <div>{'유저 정보가 존재하지 않습니다'}</div>;
  }

  if (isLoading) {
    return (
      <div className={'flex justify-center items-center h-screen'}>
        {'로딩 중...'}
      </div>
    );
  }

  if (isError || !logData || !logData.data) {
    return (
      <div className={'flex flex-col justify-center items-center h-screen'}>
        <p className={'text-red-600'}>
          {'로그 데이터를 불러오는 데 실패했습니다.'}
        </p>
        <button
          type={'button'}
          className={'mt-4 bg-primary text-white px-4 py-2 rounded'}
          onClick={() => router.back()}
        >
          {'뒤로 가기'}
        </button>
      </div>
    );
  }

  const {
    authorNickname,
    authorThumbnailImage,
    is_my_document: isMyDocument,
    document_id: documentId,
    class_log: { image, subject, activity_type: activityType, memo },
    created_dt: createdDt,
    viewCount,
  } = logData.data;

  const formattedDate = new Date(createdDt).toLocaleString();

  return (
    <div
      className={
        'flex flex-col justify-center desktop:max-w-2xl laptop:max-w-xl max-w-sm mx-auto p-4 bg-white shadow rounded-lg'
      }
    >
      <div className={'flex justify-between'}>
        <div className={'flex items-center space-x-4 mb-4'}>
          <Image
            src={authorThumbnailImage}
            alt={`${authorNickname}의 프로필 이미지`}
            className={'w-10 h-10 rounded-full object-cover'}
            width={40}
            height={40}
          />
          <div>
            <p className={'font-semibold text-slate-800'}>{authorNickname}</p>
            <p className={'text-sm text-slate-500'}>{formattedDate}</p>
          </div>
        </div>
        {isMyDocument && session && (
          <Dots id={documentId} accessToken={session.accessToken} />
        )}
      </div>
      <div className={'mb-4'}>
        <p className={'text-slate-800 text-lg font-semibold'}>{subject}</p>
        <p className={'text-slate-600 text-sm mb-2'}>{activityType}</p>
        <p className={'text-slate-700'}>{memo}</p>
      </div>

      {image?.length > 0 && <RecordSwiper images={image} />}

      <div
        className={
          'flex justify-between items-center text-slate-600 text-sm mt-4'
        }
      >
        <span>{`조회수: ${viewCount}`}</span>
      </div>

      <CommentSection
        postId={Number(params.id)}
        accessToken={session?.accessToken || ''}
      />
    </div>
  );
}
