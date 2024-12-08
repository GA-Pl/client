import Image from 'next/image';
import NaverLogin from './_component/NaverLogin';
import TypingTop from './_component/TypingTop';
import KakaoLogin from './_component/KakaoLogin';

const LoginPage = () => {
  return (
    <div className={'flex justify-center items-center text-slate-700'}>
      <div className={'flex flex-col rounded-lg shadow-lg'}>
        <div className={'flex p-8 flex-col bg-slate-200 h-full'}>
          <TypingTop />
          <Image
            src={'/images/gappler.png'}
            width={200}
            height={50}
            alt={'logo'}
            priority
          />
          <h2
            className={
              'flex justify-center font-semibold text-xl text-slate-600'
            }
          >
            {'반갑습니다!'}
          </h2>
        </div>
        <div className={'flex flex-col mt-8 p-6 h-full'}>
          <div className={'text-center font-pretendard text-gray-600'}>
            <span className={'font-maple text-[#ED4264]'}>{'GA:Pl'}</span>
            {' 에서는'}
            {' 별도의 가입 절차 없이 '}
            <br />
            {'간편하게 네이버 로그인하세요!'}
          </div>
          <div className={'mt-6'}>
            <NaverLogin />
            <KakaoLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
