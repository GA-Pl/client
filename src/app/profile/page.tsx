import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import UserInfo from './_component/UserInfo';

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

export default function Profile() {
  return (
    <div className={'p-5'}>
      <UserInfo />
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
