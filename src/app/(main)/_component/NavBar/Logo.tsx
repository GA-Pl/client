import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link className={'my-4 ml-4'} href={'/landing'}>
      <Image
        src={'/images/GappleLogo.png'}
        width={80}
        height={50}
        alt={'logo'}
      />
    </Link>
  );
};

export default Logo;
