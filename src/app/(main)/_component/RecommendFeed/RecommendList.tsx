import RecommendCard from './RecommendCard';

function RecommendList() {
  const data = [
    {
      profileImg: '/images/gappler.png',
      name: 'MIKIO',
      title: '우주선 놀이 후기',
      sentence: '저희반 유아들이 가장 관심 많아하는 우주선 놀이 공유..',
      like: 45,
    },
    {
      profileImg: '/images/우사기.webp',
      name: 'KIOMI',
      title: '타코야키를 좋아합니다.',
      sentence: '역할놀이 영역에 타코야끼 장난감을 두었더니..',
      like: 40,
    },
    {
      profileImg: '/images/쿠리만쥬.webp',
      name: '정은',
      title: '유아교육은 즐겁습니다.',
      sentence: '컴공과는 다른 매력입니다. 유교를 위한 웹이라니..',
      like: 38,
    },
    {
      profileImg: '/images/치이카와.webp',
      name: '혀니',
      title: '가을 맞이 새 노래 배우기',
      sentence: '요즘 우리반 유아들이 도토리랑 다람쥐에 관심이..',
      like: 32,
    },
    {
      profileImg: '/images/하치와레.webp',
      name: '가니',
      title: '후속 활동으로 잘 유도하는법!',
      sentence: '열혈 초임교사가 알려드립니다~~~',
      like: 27,
    },
  ];
  return (
    <div>
      <h2 className="mt-8 mb-4 font-bold">{'🤖 이런 글은 어떠세요?'}</h2>
      {data.map((item) => (
        <RecommendCard
          key={item.name}
          profileImg={item.profileImg}
          name={item.name}
          title={item.title}
          sentence={item.sentence}
          like={item.like}
        />
      ))}
    </div>
  );
}
export default RecommendList;
