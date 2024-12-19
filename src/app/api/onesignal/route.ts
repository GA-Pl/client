import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subscriptionId } = body;

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID가 제공되지 않았습니다.' },
        { status: 400 },
      );
    }

    console.log('구독 ID 저장:', subscriptionId);

    return NextResponse.json(
      { message: '구독 정보 저장 성공!' },
      { status: 200 },
    );
  } catch (error) {
    console.error('구독 정보 처리 중 오류 발생:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
