import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PutProfileParams } from '@/types/profile';
import { getUserInfo } from './getUserInfo';
import putProfile from './putProfile';

export function useUserInfo(userId: number, accessToken: string) {
  const queryClient = useQueryClient();

  const {
    data: userInfo,
    isLoading,
    isError,
    error,
  } = useQuery(['userInfo', userId], () => getUserInfo(userId, accessToken), {
    enabled: !!accessToken,
  });

  const updateUserInfoMutation = useMutation(
    (userInfoData: PutProfileParams) => putProfile(userInfoData, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userInfo', userId]);
      },
      onError: (error) => {
        console.error('Failed to update user info:', error);
      },
    },
  );

  return {
    userInfo,
    updateUserInfo: updateUserInfoMutation.mutate,
    isLoading,
    isError,
    error,
  };
}
