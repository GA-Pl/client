import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth'; // 세션 정보를 가져오는 auth 함수

// 보호된 경로 (로그인된 사용자만 접근 가능)
const protectedRoutes = [
  '/record',
  '/notification',
  '/scraps',
  '/settings',
  '/lessonForm',
];

// 로그인된 사용자가 접근할 수 없는 경로 (로그인된 상태에서 접근 금지)
const authRoutes = ['/login', '/signup', '/signin'];

export async function middleware(request: NextRequest) {
  const session = await auth(); // 로그인 세션 확인
  const { pathname } = request.nextUrl;

  // 인증이 필요한 경로에 대한 접근 제어
  if (isMatch(pathname, protectedRoutes)) {
    return session
      ? NextResponse.next() // 세션이 있으면 정상적으로 접근 허용
      : NextResponse.redirect(new URL('/login', request.url)); // 세션이 없으면 로그인 페이지로 리다이렉트
  }

  // 인증 후에는 로그인 및 회원가입 페이지 접근 차단
  if (isMatch(pathname, authRoutes)) {
    return session
      ? NextResponse.redirect(new URL('/', request.url)) // 이미 로그인된 사용자는 홈으로 리다이렉트
      : NextResponse.next(); // 로그인되지 않은 경우 접근 허용
  }

  return NextResponse.next(); // 나머지 경로는 그냥 통과
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
