import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '../SearchBar/SearchBar';

function MainTop() {
  return (
    <div className={'flex items-center justify-around p-0'}>
      <div className={'laptop:hidden mr-8'}>
        <Link href={'/'} className={'m-4'}>
          <Image
            src={'/images/gappleapple.png'}
            height={25}
            width={25}
            alt={'logo'}
            priority
          />
        </Link>
      </div>
      <SearchBar />
    </div>
  );
}

export default MainTop;
