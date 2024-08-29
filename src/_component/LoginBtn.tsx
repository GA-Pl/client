import Link from 'next/link';

export default function LoginBtn() {
  return (
    <Link href="/login" className="inline-flex justify-center items-center">
      <div className="px-4 py-2 font-maple text-primary rounded-full border border-solid transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95">
        로그인
      </div>
    </Link>
  );
}