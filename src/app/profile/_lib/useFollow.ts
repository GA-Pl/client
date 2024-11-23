import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import postFollow from './postFollow';
import { getFollower, getFollowing } from './getFollow';

export function useFollowers(userId: number, accessToken: string) {
  return useQuery(
    ['followers', userId],
    () => getFollower(userId, accessToken),
    {
      enabled: !!accessToken,
      onError: (error) => console.error('Error fetching followers:', error),
    },
  );
}

export function useFollowing(userId: number, accessToken: string) {
  return useQuery(
    ['following', userId],
    () => getFollowing(userId, accessToken),
    {
      enabled: !!accessToken,
      onError: (error) => console.error('Error fetching following:', error),
    },
  );
}

export function useFollow(userId: number, accessToken: string) {
  const queryClient = useQueryClient();

  const followMutation = useMutation(() => postFollow(userId, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo', userId]);
      queryClient.invalidateQueries(['followers', userId]);
      queryClient.invalidateQueries(['following', userId]);
    },
    onError: (error: Error) => {
      console.error('Failed to follow user:', error);
    },
  });
  return {
    follow: followMutation.mutate,
    isFollowing: followMutation.isLoading,
    error: followMutation.error,
  };
}
