import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';
import extractErrorMessage from '@/_lib/utils/extractErrorMessage';

export async function POST(request: NextRequest) {
  const rawFormData = await request.json();

  const formData = {
    title: rawFormData.title || null,
    subject: rawFormData.subject || null,
    detail_subject: rawFormData.detail_subject || null,
    age: rawFormData.age ?? null,
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
    activity_content: rawFormData.activity_content?.length
      ? rawFormData.activity_content
      : null,
    nuri_curriculum: rawFormData.nuri_curriculum?.length
      ? rawFormData.nuri_curriculum
      : null,
    image_id: rawFormData.image_id ?? null,
    attachment_id: rawFormData.attachment_id ?? null,
  };

  try {
    const response = await apiRequest(
      'post',
      `/document/plan?draft=true`,
      formData,
    );
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    console.error('외부 API 호출 실패:', errorMessage);
    return NextResponse.json(
      { message: errorMessage },
      {
        status: errorMessage === 'Authorization token is required' ? 401 : 500,
      },
    );
  }
}

export async function GET() {
  try {
    const data = await apiRequest('get', `/document/drafts?cursor=`);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    console.error('외부 API 호출 실패:', errorMessage);
    return NextResponse.json(
      { message: errorMessage },
      {
        status: errorMessage === 'Authorization token is required' ? 401 : 500,
      },
    );
  }
}
