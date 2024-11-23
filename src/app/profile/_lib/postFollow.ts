import axios from 'axios';

const postFollow = async (id: number, accessToken: string) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post(
      `/api/profile/postFollow/${id}`,
      {},
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error('팔로우 요청 실패:', error);
    throw error;
  }
};

export default postFollow;
