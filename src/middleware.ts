import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

// const protectedRoutes = [
//   '/record',
//   '/notification',
//   '/scraps',
//   '/settings',
//   '/lessonForm',
// ];

export async function middleware(request: NextRequest) {
  const session = await auth(); // 세션 확인
  const { pathname } = request.nextUrl;

  if (!session && pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url)); // 로그인 페이지로 리다이렉트
  }

  if (
    !session &&
    !pathname.startsWith('/login') &&
    !pathname.startsWith('/signup') &&
    !pathname.startsWith('/signin')
  ) {
    return NextResponse.redirect(new URL('/login', request.url)); // 로그인 페이지로 리다이렉트
  }

  // 로그인한 경우, 로그인 페이지는 홈으로 리다이렉트
  if (
    session &&
    (pathname.startsWith('/login') ||
      pathname.startsWith('/signup') ||
      pathname.startsWith('/signin'))
  ) {
    return NextResponse.redirect(new URL('/', request.url)); // 홈 페이지로 리다이렉트
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    '/record',
    '/notification',
    '/scraps',
    '/settings',
    '/lessonForm',
    '/login',
    '/signup',
    '/signin',
    '/', // 메인 페이지도 포함
  ],
};
