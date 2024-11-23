import Link from 'next/link';

interface ErrorPageProps {
  searchParams: {
    message?: string;
  };
}

export default function ErrorPage({ searchParams }: ErrorPageProps) {
  return (
    <div
      className={
        'flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900'
      }
    >
      <div className={'p-6 rounded-lg shadow-lg bg-white max-w-sm'}>
        <h1 className={'text-3xl font-bold text-primary mb-2'}>
          {'에러 발생!'}
        </h1>
        <h2 className={'text-lg mb-4'}>
          {decodeURIComponent(searchParams.message || '에러 메시지가 없습니다')}
        </h2>
        <Link
          href={'/'}
          className={
            'text-white bg-primary hover:bg-primary-dark font-bold py-2 px-4 rounded'
          }
        >
          {'메인으로 돌아가기'}
        </Link>
      </div>
    </div>
  );
}
