import Image from 'next/image';
import { signIn } from '@/auth';
import { signInWithNaver } from '@/serverActions/auth';

export default function LoginButton() {
  return (
    <form className="flex justify-center items-center" action={signInWithNaver}>
      <button type="submit" className="button-effect">
        <Image
          src={'/images/loginBtnWhite.png'}
          width={200}
          height={50}
          alt={'login'}
          priority
        />
      </button>
    </form>
  );
}
