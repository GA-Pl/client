import axios from 'axios';
import { updateSession } from '@/serverActions/auth';

interface ProfileResponse {
  user: {
    nickname: string;
    selfIntro: string;
    profileImg: string;
    image_file_id?: number;
  };
}

const putProfile = async (
  profileData: {
    nickname?: string;
    selfIntro?: string;
    image_file_id?: number;
  },
  accessToken: string,
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.put<ProfileResponse>(
      `/api/profile/putProfile`,
      profileData,
      {
        headers,
      },
    );
    const updatedUser = response.data.user;

    await updateSession({
      name: updatedUser.nickname,
      profileImg: updatedUser.profileImg,
      selfIntro: updatedUser.selfIntro,
    });
    return response.data;
  } catch (error) {
    console.error('프로필 수정 실패:', error);
    throw error;
  }
};

export default putProfile;
