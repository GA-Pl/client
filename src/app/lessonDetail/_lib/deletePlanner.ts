import axios from 'axios';

const deletePlanner = async (id: number, accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.delete(`/api/document/lessonDetail/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('계획안 삭제 실패:', error);
    throw error;
  }
};

export default deletePlanner;
