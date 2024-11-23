import axios from 'axios';

interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
}

const postComment = async (
  commentData: {
    content: string;
    parentCommentId?: number;
  },
  id: number,
  accessToken: string,
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post<CommentResponse>(
      `/api/comment/${id}`,
      commentData,
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error('코멘트 제출 실패:', error);
    throw error;
  }
};

export default postComment;
