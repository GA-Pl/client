import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';

export async function POST(request: NextRequest) {
  const formData = await request.json();

  try {
    const data = await apiRequest('post', '/gpt/document', formData);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('AI 계획안 API 호출 실패:', message);
    return NextResponse.json(
      { message },
      { status: message === 'Authorization token is required' ? 401 : 500 },
    );
  }
}
