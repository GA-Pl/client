export default function Features() {
  return (
    <section className={'py-16 bg-gray-50'}>
      <h2 className={'text-2xl font-semibold text-center text-gray-800'}>
        {'유아 교사를 위한 필수 도구를 한곳에 모았습니다'}
      </h2>
      <p className={'mt-2 text-center text-gray-600'}>
        {'Gapple은 당신의 수업 준비 시간을 절반으로 줄여줍니다.'}
      </p>
      <div className={'mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6'}>
        <FeatureCard
          title={'AI 교육 계획ㄴ안 작성'}
          description={
            'AI를 활용하여 학생들에게 맞춤화된 교육 계획안을 몇 초 만에 작성하세요.'
          }
          icon={'🤖'}
        />
        <FeatureCard
          title={'일반 계획안 작성 툴'}
          description={
            '쉽고 직관적인 UI로 일반 교육 계획안도 빠르게 완성할 수 있습니다.'
          }
          icon={'📄'}
        />
        <FeatureCard
          title={'커뮤니티'}
          description={
            '전문 교사들과의 커뮤니티에서 정보를 공유하고 협력하세요.'
          }
          icon={'🌐'}
        />
        <FeatureCard
          title={'수업 기록 관리'}
          description={
            '완성된 계획안을 바탕으로 수업 기록을 체계적으로 관리하세요.'
          }
          icon={'📝'}
        />
        <FeatureCard
          title={'자료 공유'}
          description={
            '교육 자료를 업로드하고 동료 교사들과 공유할 수 있습니다.'
          }
          icon={'📤'}
        />
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className={'p-6 bg-white rounded shadow'}>
      <div className={'text-4xl'}>{icon}</div>
      <h3 className={'mt-4 text-lg font-semibold text-gray-800'}>{title}</h3>
      <p className={'mt-2 text-gray-600'}>{description}</p>
    </div>
  );
}
