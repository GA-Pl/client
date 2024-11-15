import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function getSessionOrReject() {
  const session = await auth();

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { message: 'Authorization token is required' },
      { status: 401 },
    );
  }

  return session;
}
