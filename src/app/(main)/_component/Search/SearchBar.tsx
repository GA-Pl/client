interface SearchBarProps {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
}

export default function SearchBar({
  showSearch,
  setShowSearch,
}: SearchBarProps) {
  return (
    <div
      className={`z-10 fixed inset-0 transition-all duration-500 ease-in-out bg-white shadow-md
         ${showSearch ? 'w-dvw laptop:w-1/2 desktop:w-1/4 opacity-100 pointer-events-auto' : 'w-0 h-0 opacity-0 pointer-events-none'}
          bg-white shadow-md laptop:top-0 laptop:left-20 laptop:w-1/3 laptop:right-0 
      desktop:left-52 desktop:w-1/3 desktop:h-full`}
    >
      <div className={`flex flex-col ${showSearch ? 'block' : 'hidden'} p-4 `}>
        <input
          type={'text'}
          className={'w-full p-2 border border-gray-300 '}
          placeholder={'검색'}
        />
        <button
          type={'button'}
          onClick={() => setShowSearch(false)}
          className={'flex ml-auto mt-2 p-2 bg-blue-500 text-white rounded'}
        >
          {'닫기'}
        </button>
      </div>
    </div>
  );
}
