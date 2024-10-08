import Image from 'next/image';
import Link from 'next/link';

function SearchBar() {
  return (
    <Link href={'/search'} scroll={false}>
      <div
        className={
          'flex justify-center items-center bg-white rounded-full border-4 p-2 desktop:w-96 h-12 border-primary500 shadow-lg shadow-primary200 hover:shadow-primary400 '
        }
      >
        <input className={'flex pr-2 laptop:w-72 '} placeholder={'가을 놀이'} />
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
      </div>
    </Link>
  );
}
export default SearchBar;
