import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

const protectedRoutes = [
  '/record',
  '/notification',
  '/scraps',
  '/settings',
  '/lessonForm',
];

const authRoutes = ['/login', '/signup', '/signin'];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (isMatch(pathname, protectedRoutes)) {
    return session
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url)); // 세션이 없으면 로그인 페이지로 리다이렉트
  }

  if (isMatch(pathname, authRoutes)) {
    return session
      ? NextResponse.redirect(new URL('/', request.url)) // 이미 로그인된 사용자는 홈으로 리다이렉트
      : NextResponse.next();
  }

  return NextResponse.next();
}

// 경로 일치 확인 함수
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => pathname.startsWith(url)); // 간단한 경로 일치 확인
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
  ],
};
