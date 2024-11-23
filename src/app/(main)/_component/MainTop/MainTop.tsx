import SearchBar from '../SearchBar/SearchBar';
import CreateButton from '../Create/CreateButton';

function MainTop() {
  return (
    <div className={'flex items-center justify-around my-4'}>
      <SearchBar />
      <CreateButton />
    </div>
  );
}

export default MainTop;
