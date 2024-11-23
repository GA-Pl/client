'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import FollowList from './FollowList';
import UserInfo from './UserInfo';
import { useUserInfo } from '../../_lib/useUserInfo'; // Ensure it's correctly imported
import { useFollowers, useFollowing } from '../../_lib/useFollow';

const ProfileTop = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const token = session?.accessToken || '';
  const userId = Number(pathname.split('/')[2]);
  const { userInfo, updateUserInfo, isLoading, isError, error } = useUserInfo(
    userId,
    token,
  );

  const { data: followersData } = useFollowers(userId, token);
  const { data: followingData } = useFollowing(userId, token);

  return (
    <div className={'mb-6'}>
      <UserInfo
        userInfo={userInfo?.data}
        updateUserInfo={updateUserInfo}
        userId={userId}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <FollowList
        userInfo={userInfo?.data}
        follow={followersData?.data}
        following={followingData?.data}
      />
    </div>
  );
};

export default ProfileTop;
