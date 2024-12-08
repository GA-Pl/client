import { BASE_NEXT_URL } from '@/_lib/utils/config';
import axios from 'axios';

const putPlanner = async (
  formData: {
    title: string;
    subject: string;
    detail_subject: string;
    age: number;
    group_size: string;
    activity_type: string;
    activity_goal: string[];
    activity_tool: string[];
    precautions: string[];
    evaluation_criteria: string[];
    activity_content: { subtitle: string; content: string }[];
    nuri_curriculum: any;
    image_id: number;
    attachment_id: number;
  },
  accessToken: string,
  id: number,
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.put(
      `${BASE_NEXT_URL}/api/document/lessonDetail/${id}`,
      formData,
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error('폼 제출 실패:', error);
    throw error;
  }
};

export default putPlanner;
