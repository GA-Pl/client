'use client';

import LogCard from './LogCard';
import PlanCard from './PlanCard';
import UserCard from './UserCard';

interface SearchResultsProps {
  query: string;
  isLoading: boolean;
  isError: boolean;
  data?: {
    user_result: any[];
    log_result: any[];
    plan_result: any[];
  };
}

export default function SearchResults({
  query,
  isLoading,
  isError,
  data,
}: SearchResultsProps) {
  if (!query) {
    return (
      <div className={'flex justify-center items-center text-slate-600 h-20'}>
        {'검색어를 입력해주세요'}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={'flex justify-center items-center text-slate-600 h-20'}>
        {'검색 중...'}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={'flex justify-center items-center text-red-600 h-20'}>
        {'검색 중 오류가 발생했습니다.'}
      </div>
    );
  }

  if (
    !data ||
    (!data.user_result?.length &&
      !data.log_result?.length &&
      !data.plan_result?.length)
  ) {
    return (
      <div className={'flex justify-center items-center text-slate-600 h-20'}>
        {'사용자가 작성한 키워드에 맞는 결과가 없습니다'}
      </div>
    );
  }

  return (
    <div
      className={
        'flex flex-col mt-4 overflow-y-auto max-h-[500px] space-y-4 p-2'
      }
    >
      {data.user_result?.length > 0 && (
        <div className={'text-slate-600 text-sm'}>{'유저'}</div>
      )}
      {data.user_result &&
        data.user_result.map((user) => (
          <UserCard key={user.user_id} user={user} />
        ))}
      {data.log_result?.length > 0 && (
        <div className={'text-slate-600 text-sm'}>{'수업 기록'}</div>
      )}
      {data.log_result &&
        data.log_result.map((result) => (
          <LogCard key={result.id} result={result} />
        ))}
      {data.plan_result?.length > 0 && (
        <div className={'text-slate-600 text-sm'}>{'교육 계획안'}</div>
      )}
      {data.plan_result &&
        data.plan_result.map((result) => (
          <PlanCard key={result.id} result={result} />
        ))}
    </div>
  );
}
