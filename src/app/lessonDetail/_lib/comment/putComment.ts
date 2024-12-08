import axios from 'axios';

interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
}

const putComment = async (
  commentData: {
    content: string;
  },
  id: number,
  accessToken: string,
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.put<CommentResponse>(
      `/api/comment/${id}`,
      commentData,
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw error;
  }
};

export default putComment;
