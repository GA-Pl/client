import { BASE_NEXT_URL } from '@/_lib/utils/config';
import axios from 'axios';

const postDraft = async (
  rawFormData: {
    title: string;
    subject?: string | null;
    detail_subject?: string | null;
    age?: number | null;
    group_size?: string | null;
    activity_type?: string | null;
    activity_goal?: string[] | null;
    activity_tool?: string[] | null;
    precautions?: string[] | null;
    evaluation_criteria?: string[] | null;
    activity_content?: { subtitle: string; content: string }[] | null;
    nuri_curriculum?:
      | { main_category: string; sub_category: string; content: string }[]
      | null;
    image_id?: number | null;
    attachment_id?: number | null;
  },
  accessToken: string,
) => {
  const isEmptyArray = (array: any[]) =>
    !array ||
    array.length === 0 ||
    array.every((item) => Object.values(item).every((value) => value === ''));

  const formData = {
    title: rawFormData.title || null,
    subject: rawFormData.subject || null,
    detail_subject: rawFormData.detail_subject || null,
    age: rawFormData.age && rawFormData.age > 0 ? rawFormData.age : null, // 0이면 null
    group_size: rawFormData.group_size || null,
    activity_type: rawFormData.activity_type || null,
    activity_goal: rawFormData.activity_goal?.length
      ? rawFormData.activity_goal
      : null,
    activity_tool: rawFormData.activity_tool?.length
      ? rawFormData.activity_tool
      : null,
    precautions: rawFormData.precautions?.length
      ? rawFormData.precautions
      : null,
    evaluation_criteria: rawFormData.evaluation_criteria?.length
      ? rawFormData.evaluation_criteria
      : null,
    activity_content:
      !rawFormData.activity_content ||
      isEmptyArray(rawFormData.activity_content)
        ? null
        : rawFormData.activity_content,
    nuri_curriculum:
      !rawFormData.nuri_curriculum || isEmptyArray(rawFormData.nuri_curriculum)
        ? null
        : rawFormData.nuri_curriculum,
    image_id:
      rawFormData.image_id && rawFormData.image_id > 0
        ? rawFormData.image_id
        : null,
    attachment_id:
      rawFormData.attachment_id && rawFormData.attachment_id > 0
        ? rawFormData.attachment_id
        : null,
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post(`${BASE_NEXT_URL}/api/draft`, formData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('폼 제출 실패:', error);
    throw error;
  }
};

export default postDraft;
