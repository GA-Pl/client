import { NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';
import { auth } from '@/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const types = searchParams.get('types');

  const session = await auth();
  if (!session || !session.accessToken) {
    return NextResponse.json(
      { message: 'Authorization token is required' },
      { status: 401 },
    );
  }

  if (!keyword || !types) {
    return NextResponse.json(
      { message: 'Both keyword and types parameters are required' },
      { status: 400 },
    );
  }

  try {
    const response = await apiRequest(
      'get',
      `/document/search?keyword=${encodeURIComponent(keyword)}&types=${encodeURIComponent(
        types,
      )}`,
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('검색 API 호출 실패:', message);
    return NextResponse.json(
      { message },
      { status: message === 'Authorization token is required' ? 401 : 500 },
    );
  }
}
