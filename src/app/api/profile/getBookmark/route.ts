import { NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';

export const runtime = 'edge';

export async function GET() {
  try {
    const data = await apiRequest(
      'get',
      '/document/profile/bookmarked?cursor=',
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('API 호출 실패:', message);
    return NextResponse.json(
      { message },
      { status: message === 'Authorization token is required' ? 401 : 500 },
    );
  }
}
