import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

const protectedRoutes = [
  '/lessonForm',
  '/profile',
  '/ai',
  '/createRecord',
  '/lessonDetail',
];

const authRoutes = ['/login', '/landing'];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    const token = request.headers.get('Authorization');
    if (!token) {
      return NextResponse.json(
        { message: 'Authorization token is required' },
        { status: 401 },
      );
    }
  }

  if (isMatch(pathname, protectedRoutes)) {
    return session
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url));
  }

  if (isMatch(pathname, authRoutes)) {
    return session
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next();
  }

  return NextResponse.next();
}

function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => pathname === url || pathname.startsWith(`${url}/`));
}

export const config = {
  matcher: [
    '/lessonForm',
    '/profile/:path*',
    '/ai',
    '/createRecord',
    '/lessonDetail/:path*',
    '/scraps',
    '/settings',
    '/login',
    '/landing',
  ],
};
