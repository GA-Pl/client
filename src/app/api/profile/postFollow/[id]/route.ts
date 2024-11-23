import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const formData = await request.json();

  try {
    const response = await apiRequest(
      'post',
      `/profile/follow?user_id=${id}`,
      formData,
    );
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    console.error('팔로우 API 호출 실패:', errorMessage);
    return NextResponse.json(
      { message: errorMessage },
      {
        status: errorMessage === 'Authorization token is required' ? 401 : 500,
      },
    );
  }
}

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error occurred';
}
