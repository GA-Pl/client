import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className={'flex flex-col items-center justify-center h-dvh'}>
      <h1 className={'font-pretendard text-slate-700 font-semibold text-xl'}>
        {'잘못된 접근입니다'} <br />
        {'URL 주소를 다시 한번 확인해주세요.'}
      </h1>
      <Image
        src={'/images/404.PNG'}
        width={400}
        height={400}
        alt={'not found'}
      />
      <div className={'text-slate-700 text-lg'}>
        <Link href={'/'} className={'mr-2 font-maple text-primary'}>
          {'메인 페이지'}
        </Link>
        {'로 돌아가기'}
      </div>
    </div>
  );
}
