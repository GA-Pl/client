import RecommendCard from './RecommendCard';

function RecommendList() {
  const data = [
    {
      profileImg:
        'https://store.kyobobook.co.kr/_next/image?url=https%3A%2F%2Fcontents.kyobobook.co.kr%2Fsih%2Ffit-in%2F144x222%2Fpdt%2F9791158364953.jpg&w=282&q=80',
      link: 'https://product.kyobobook.co.kr/detail/S000214608467',
      title: '산타 할아버지의 첫 크리스마스',
      sentence: '맥 바넷 · 책읽는곰 2024.10.25',
      like: 45,
    },
    {
      profileImg:
        'https://store.kyobobook.co.kr/_next/image?url=https%3A%2F%2Fcontents.kyobobook.co.kr%2Fsih%2Ffit-in%2F144x222%2Fpdt%2F9788954602792.jpg&w=282&q=80',
      link: 'https://product.kyobobook.co.kr/detail/S000000776976',
      title: '천둥 꼬마 선녀 번개 꼬마 선녀',
      sentence: '한강 · 문학동네 2014.09.26',
      like: 40,
    },
    {
      profileImg:
        'https://store.kyobobook.co.kr/_next/image?url=https%3A%2F%2Fcontents.kyobobook.co.kr%2Fsih%2Ffit-in%2F144x222%2Fpdt%2F9791158364519.jpg&w=282&q=80',
      link: 'https://product.kyobobook.co.kr/detail/S000212461447',
      title: '감정 호텔',
      sentence: '리디아 브란코비치 · 책읽는곰 2024.02.23',
      like: 38,
    },
    {
      profileImg:
        'https://store.kyobobook.co.kr/_next/image?url=https%3A%2F%2Fcontents.kyobobook.co.kr%2Fsih%2Ffit-in%2F144x222%2Fpdt%2F9791193506721.jpg&w=282&q=80',
      link: 'https://product.kyobobook.co.kr/detail/S000214014924',
      title: '소나기',
      sentence: '피도크 · 포레스트북스 2024.08.14',
      like: 32,
    },
    {
      profileImg:
        'https://store.kyobobook.co.kr/_next/image?url=https%3A%2F%2Fcontents.kyobobook.co.kr%2Fsih%2Ffit-in%2F144x222%2Fpdt%2F8809264181515.jpg&w=282&q=80',
      link: 'https://product.kyobobook.co.kr/detail/S000000348808',
      title: '호두까기 인형',
      sentence: '피오나 와트 · 어스본코리아 2020.11.05',
      like: 27,
    },
  ];
  return (
    <div>
      <h2 className={'mt-8 mb-4 font-bold'}>{'📚 이런 동화책은 어떠세요'}</h2>
      {data.map((item) => (
        <RecommendCard
          key={item.title}
          profileImg={item.profileImg}
          title={item.title}
          sentence={item.sentence}
          like={item.like}
          link={item.link}
        />
      ))}
    </div>
  );
}
export default RecommendList;
