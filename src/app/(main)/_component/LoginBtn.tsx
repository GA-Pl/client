'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function LoginBtn() {
  const { data: session } = useSession();

  if (session && session.user) {
    // 로그인이 되어 있을 경우
    return <p>{session.user.email}</p>; // 사용자 이메일 표시
  } else {
    // 로그인이 되어 있지 않을 경우
    return (
      <Link
        href="/login"
        className="flex justify-center items-center font-maple text-primary border border-solid button-effect"
        style={{ width: '75px', height: '30px' }}
      >
        로그인
      </Link>
    );
  }
}
