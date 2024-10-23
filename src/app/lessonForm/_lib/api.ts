import axios from 'axios';

const submitLessonForm = async (
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
  },
  accessToken: string,
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post(`/api/lessonform`, formData, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('폼 제출 실패:', error);
    throw error;
  }
};

export default submitLessonForm;
