import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';

export async function GET(
  req: NextRequest,
  context: { params: { slug: string } },
) {
  const { slug } = context.params;

  if (!slug) {
    return NextResponse.json(
      { message: 'Slug parameter is missing' },
      { status: 400 },
    );
  }

  try {
    const data = await apiRequest(
      'get',
      `/document/detail/log?document_id=${slug}`,
    );

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
