import { BASE_NEXT_URL } from '@/_lib/utils/config';
import axios from 'axios';

const modifyDraft = async (
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
  id: number,
) => {
  const isEmptyArray = (array: any[]) =>
    !array ||
    array.length === 0 ||
    array.every(
      (item) =>
        item === null || // Check for null
        item === undefined || // Check for undefined
        (typeof item === 'object' &&
          Object.values(item).every((value) => value === '' || value === null)), // Check if all object fields are empty or null
    );

  const formData = {
    title: rawFormData.title || null,
    subject: rawFormData.subject || null,
    detail_subject: rawFormData.detail_subject || null,
    age: rawFormData.age && rawFormData.age > 0 ? rawFormData.age : null, // If age is <= 0, set to null
    group_size: rawFormData.group_size || null,
    activity_type: rawFormData.activity_type || null,
    activity_goal:
      rawFormData.activity_goal && !isEmptyArray(rawFormData.activity_goal)
        ? rawFormData.activity_goal
        : null,
    activity_tool:
      rawFormData.activity_tool && !isEmptyArray(rawFormData.activity_tool)
        ? rawFormData.activity_tool
        : null,
    precautions:
      rawFormData.precautions && !isEmptyArray(rawFormData.precautions)
        ? rawFormData.precautions
        : null,
    evaluation_criteria:
      rawFormData.evaluation_criteria &&
      !isEmptyArray(rawFormData.evaluation_criteria)
        ? rawFormData.evaluation_criteria
        : null,
    activity_content:
      rawFormData.activity_content &&
      !isEmptyArray(rawFormData.activity_content)
        ? rawFormData.activity_content
        : null,
    nuri_curriculum:
      rawFormData.nuri_curriculum && !isEmptyArray(rawFormData.nuri_curriculum)
        ? rawFormData.nuri_curriculum
        : null,
    image_id:
      rawFormData.image_id && rawFormData.image_id > 0
        ? rawFormData.image_id
        : null,
    attachment_id:
      rawFormData.attachment_id && rawFormData.attachment_id > 0
        ? rawFormData.attachment_id
        : null,
    isDraft: true,
  };

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
    console.error('폼 수정 실패:', error);
    throw error;
  }
};

export default modifyDraft;
