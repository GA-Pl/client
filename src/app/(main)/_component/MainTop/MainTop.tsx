import SearchBar from '../SearchBar/SearchBar';
import CreateButton from '../Create/CreateButton';

function MainTop() {
  return (
    <div className={'flex justify-around'}>
      <SearchBar />
      <CreateButton />
    </div>
  );
}

export default MainTop;
