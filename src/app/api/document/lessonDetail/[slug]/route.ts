import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';

export async function GET(req: NextRequest) {
  const host = req.headers.get('host');
  const url = new URL(req.url, `http://${host}`);
  const slug = url.pathname.split('/').pop();

  try {
    const data = await apiRequest(
      'get',
      `/document/detail/plan?document_id=${slug}`,
      req,
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
