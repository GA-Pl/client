import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { subscriptionId } = body;
  console.log('body');
  console.log(body);

  console.log('subscriptionId');
  console.log(subscriptionId);

  try {
    const data = await apiRequest('post', '/auth/subscription', subscriptionId);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('구독 아이디 저장 실패', message);
    return NextResponse.json(
      { message },
      { status: message === 'Authorization token is required' ? 401 : 500 },
    );
  }
}
