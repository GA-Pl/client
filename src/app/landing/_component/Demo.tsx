import Image from 'next/image';

export default function Demo() {
  return (
    <section className={'py-16 bg-slate-100'}>
      <div
        className={'mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-16'}
      >
        <DemoCard
          title={'맞춤형 계획안 생성'}
          description={'AI를 활용한 수업 계획 자동 생성 기능입니다.'}
          gifSrc={'/images/landing/demo6.gif'}
        />
        <DemoCard
          title={'교사 커뮤니티'}
          description={'교사들이 자료를 공유하고 소통할 수 있는 공간입니다.'}
          gifSrc={'/images/landing/demo5.gif'}
        />
        <DemoCard
          title={'수업 기록'}
          description={'수업 후에 간단히 기록할 수 있는 기능입니다.'}
          gifSrc={'/images/landing/demo4.gif'}
        />
      </div>
    </section>
  );
}

function DemoCard({
  title,
  description,
  gifSrc,
}: {
  title: string;
  description: string;
  gifSrc: string;
}) {
  return (
    <div className={'p-6 bg-white rounded shadow text-center'}>
      <div className={'w-full h-64 overflow-hidden rounded-md'}>
        <Image
          src={gifSrc}
          alt={title}
          className={
            'object-cover w-full h-full transform transition-transform duration-300 hover:scale-105'
          }
          width={200}
          height={200}
          unoptimized
        />
      </div>
      <h3 className={'mt-4 text-lg font-semibold text-slate-800'}>{title}</h3>
      <p className={'mt-2 text-slate-600'}>{description}</p>
    </div>
  );
}
