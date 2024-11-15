import { NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { message: 'Authorization token is required' },
      { status: 401 },
    );
  }

  try {
    const data = await apiRequest('get', '/document/feed?cursor=');
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('외부 API 호출 실패:', message);
    return NextResponse.json(
      { message },
      { status: message === 'Authorization token is required' ? 401 : 500 },
    );
  }
}
