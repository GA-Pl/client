import { NextResponse } from 'next/server';
import fetchFeeds from './mainApi';

export async function GET() {
  try {
    const fetchedFeeds = await fetchFeeds();
    const response = {
      message: '피드 목록',
      data: fetchedFeeds,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Feeds fetching failed', error);
    return NextResponse.json({ message: '서버 오류 발생' }, { status: 500 });
  }
}
