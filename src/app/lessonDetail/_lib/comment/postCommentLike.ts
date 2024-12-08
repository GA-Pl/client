import { BASE_NEXT_URL } from '@/_lib/utils/config';
import axios from 'axios';

export async function postCommentLike(id: string, token: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await axios.post(
      `${BASE_NEXT_URL}/api/comment/like/${id}`,
      {},
      {
        headers,
      },
    );
    return res;
  } catch (error) {
    console.error('Error like comments', error);
    return null;
  }
}
