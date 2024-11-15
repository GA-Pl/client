import { apiRequest } from '@/_lib/utils/api';
import extractErrorMessage from '@/_lib/utils/extractErrorMessage';
import extractUrlId from '@/_lib/utils/extractUrlId';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { id } = extractUrlId(req);
  const formData = await req.json();

  try {
    const response = await apiRequest(
      'post',
      `/document/like/comment?comment_id=${id}`,
      formData,
    );
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    console.error('좋아요 API 호출 실패:', errorMessage);
    return NextResponse.json(
      { message: errorMessage },
      {
        status: errorMessage === 'Authorization token is required' ? 401 : 500,
      },
    );
  }
}
