import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import UserInfo from './_component/UserInfo';
import FollowList from './_component/FollowList';

const profileData = {
  experienceLevel: 'Intermediate',
  introduction: 'Short bio here',
  posts: [
    '/images/우사기.webp',
    '/images/우사기.webp',
    '/images/우사기.webp',
    '/images/우사기.webp',
    '/images/우사기.webp',
    '/images/우사기.webp',
    '/images/우사기.webp',
    '/images/우사기.webp',
  ],
};

const followData = {
  follow: {
    follow_people: [
      {
        id: 1,
        name: '광망경',
        image: '/images/우사기.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
      {
        id: 2,
        name: '덩은킴',
        image: '/images/쿠리만쥬.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
      {
        id: 3,
        name: '항강응',
        image: '/images/하치와레.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
      {
        id: 4,
        name: '호떡킴',
        image: '/images/치이카와.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
    ],
    number: 4,
  },
  following: {
    following_people: [
      {
        id: 2,
        name: '덩은킴',
        image: '/images/쿠리만쥬.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
      {
        id: 3,
        name: '항강응',
        image: '/images/하치와레.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
      {
        id: 4,
        name: '호떡킴',
        image: '/images/치이카와.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
    ],
    number: 3,
  },
};

export default function Profile() {
  return (
    <div className={'p-5'}>
      <UserInfo />
      <FollowList {...followData} />
      <div className={'grid grid-cols-3 gap-2 mt-10'}>
        {profileData.posts.map((post, index) => (
          <div
            key={uuidv4()}
            className={'border-2 border-gray-100 shadow-sm overflow-hidden'}
          >
            <Image
              src={post}
              alt={`Post ${index}`}
              width={100}
              height={100}
              className={'w-full h-full object-cover'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
