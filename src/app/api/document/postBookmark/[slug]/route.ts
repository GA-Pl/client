import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';
import extractUrlId from '@/_lib/utils/extractUrlId';

export async function POST(request: NextRequest) {
  const { id } = extractUrlId(request);
  const formData = await request.json();

  try {
    const response = await apiRequest(
      'post',
      `/document/bookmark?id=${id}`,
      formData,
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    console.error('북마크 API 호출 실패:', errorMessage);
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
