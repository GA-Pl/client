import axios from 'axios';

const submitLike = async (postId: number, accessToken: string) => {
  try {
    const response = await axios.post(
      `/api/document/postLike/${postId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to toggle like:', error);
    throw error;
  }
};

const submitBookmark = async (postId: number, accessToken: string) => {
  try {
    const response = await axios.post(
      `/api/document/postBookmark/${postId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to toggle bookmark:', error);
    throw error;
  }
};

export { submitLike, submitBookmark };
