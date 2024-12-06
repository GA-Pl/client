'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface UserCardProps {
  user: {
    user_id: number;
    nickname: string;
    profileImg: string;
    selfIntro: string;
  };
}

export default function UserCard({ user }: UserCardProps) {
  const router = useRouter();

  const handleNavigation = () => {
    router.back();
    setTimeout(() => {
      router.push(`/profile/${user.user_id}/plan`);
    }, 100);
  };

  return (
    <div
      className={
        'p-4 bg-white shadow rounded-md hover:shadow-lg transition-shadow flex items-start gap-4 cursor-pointer'
      }
      onClick={handleNavigation}
    >
      <Image
        src={user.profileImg}
        alt={`${user.nickname}의 프로필 이미지`}
        className={
          'w-20 h-20 rounded-full object-cover shadow-md flex-shrink-0'
        }
        width={80}
        height={80}
      />
      <div className={'flex flex-col justify-between flex-grow'}>
        <h3 className={'text-xl font-semibold text-slate-800'}>
          {user.nickname}
        </h3>
        <p
          className={'text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3'}
        >
          {user.selfIntro}
        </p>
      </div>
    </div>
  );
}
