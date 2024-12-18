import Image from 'next/image';
import Link from 'next/link';

function SearchBar() {
  return (
    <Link
      href={'/search'}
      scroll={false}
      className={
        'flex justify-center items-center bg-white rounded-full border-4 p-2 h-12 border-primary500 shadow-primary200 hover:shadow-primary400 w-full'
      }
    >
      <span className={'flex pl-4 laptop:w-72 text-sm w-52'}>
        {'가을 놀이'}
      </span>
      <button
        type={'button'}
        className={
          'flex w-8 h-8 items-center justify-center bg-primary700 button-effect'
        }
        style={{ borderRadius: '100%' }}
      >
        <Image
          src={'/icons/searchWhite.png'}
          alt={'searchButton'}
          width={20}
          height={20}
        />
      </button>
    </Link>
  );
}
export default SearchBar;
