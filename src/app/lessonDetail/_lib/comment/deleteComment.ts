import axios from 'axios';

const deleteComment = async (id: number, accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.delete(`/api/comment/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('코멘트 삭제 실패:', error);
    throw error;
  }
};

export default deleteComment;
