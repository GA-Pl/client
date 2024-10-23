import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/_lib/utils/config';

export async function POST(request: NextRequest) {
  const formData = await request.json();
  const accessToken = request.headers.get('authorization')?.split(' ')[1];

  try {
    const response = await axios.post(`${BASE_URL}/document/plan`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('외부 API 호출 실패:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
