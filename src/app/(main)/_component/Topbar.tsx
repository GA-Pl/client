import Image from 'next/image';
import Link from 'next/link';
import ProfileIcon from './ProfileIcon';
import LoginBtn from './LoginBtn';

const isLoggedIn = false;

export default function Topbar() {
  return (
    <div className="flex items-center justify-between p-4 bg-white fixed top-0 left-0 right-0 shadow-md z-50">
      <Link href="/">
        <Image
          src={'/images/GappleLogo.png'}
          width={100}
          height={50}
          alt={'logo'}
          priority
        />
      </Link>
      {isLoggedIn ? <ProfileIcon /> : <LoginBtn />}
    </div>
  );
}
