import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      className={'flex flex-col items-center text-center bg-gray-50 py-16 px-6'}
    >
      <h1 className={'text-3xl font-bold leading-tight text-gray-800'}>
        {'유아 교사를 위한'}{' '}
        <span className={'text-primary'}>{' 교육 계획 플랫폼'}</span>
      </h1>
      <p className={'mt-4 text-slate-600'}>
        {
          'AI를 활용한 맞춤형 계획안부터 커뮤니티까지, 한곳에서 모든 수업 준비를 '
        }
        {'끝내세요.'}
      </p>
      <Link
        href={'/login'}
        className={
          'mt-6 px-6 py-3 text-white bg-primary rounded hover:bg-primary700'
        }
      >
        {'시작하기'}
      </Link>
      <Image
        src={'/images/landing/hero.png'}
        alt={'Hero Illustration'}
        className={
          'mt-8 w-full max-w-xs transform transition-transform duration-300 hover:scale-105'
        }
        width={200}
        height={200}
      />
    </section>
  );
}
