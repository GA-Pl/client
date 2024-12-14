import Link from 'next/link';
import Image from 'next/image';

function MainTop() {
  return (
    <div className={'flex items-center justify-around laptop:hidden mr-8'}>
      <Link href={'/'} className={'m-4'}>
        <Image
          src={'/images/GappleLogo.png'}
          height={100}
          width={100}
          alt={'logo'}
          priority
        />
      </Link>
    </div>
  );
}

export default MainTop;
