import Image from 'next/image';
import { signInWithKakao } from '@/serverActions/auth';

export default function LoginButton() {
  return (
    <form
      className="flex justify-center items-center m-2"
      action={signInWithKakao}
    >
      <button type="submit" className="button-effect">
        <Image
          src={'/images/kakaoLoginBtn.png'}
          width={200}
          height={50}
          alt={'login'}
          priority
        />
      </button>
    </form>
  );
}
