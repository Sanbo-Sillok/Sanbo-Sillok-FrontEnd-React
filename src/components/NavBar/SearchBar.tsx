import { useNavigate } from 'react-router-dom';

const SEARCH = 'search';

export default function SearchBar() {
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchInputElement = event.currentTarget[SEARCH];

    const searchName = searchInputElement.value;
    if (!searchName) return;

    navigate(`/wiki/${searchName}`);
    searchInputElement.value = '';
  };

  return (
    <form className="h-full" onSubmit={handleSearch}>
      <input className="h-full max-w-48 rounded-full pl-4 focus:outline-none" type="text" placeholder="Search" name={SEARCH} />
    </form>
  );
}
