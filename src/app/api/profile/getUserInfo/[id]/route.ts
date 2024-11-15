import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const data = await apiRequest('get', `/profile/user?user_id=${id}`);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('외부 사용자 정보 API 호출 실패:', message);
    return NextResponse.json(
      { message },
      { status: message === 'Authorization token is required' ? 401 : 500 },
    );
  }
}
