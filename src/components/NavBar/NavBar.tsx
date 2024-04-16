import { Link } from 'react-router-dom';
import useWindowScroll from '@/hooks/useWindowScroll';
import SearchBar from './SearchBar';
import OptionButton from './OptionButton';
import { MAIN_PAGE_URL } from '@/constants/common';

export default function NavBar() {
  const { isScrollDown } = useWindowScroll();

  return (
    <header
      className={`fixed h-16 w-full bg-base-800 px-4 py-3 shadow-lg backdrop-blur duration-300 dark:bg-base-900 ${isScrollDown ? '-mt-16' : 'mt-0'}`}
    >
      <div className="m-auto flex h-full max-w-6xl items-center justify-between gap-5">
        <Link to={MAIN_PAGE_URL} className="aspect-square h-full">
          <img src="/favicon.ico" alt="Sanbo-Sillok" />
        </Link>
        <div className="flex h-full items-center justify-center gap-4">
          <SearchBar />
          <OptionButton showOption={!isScrollDown} />
        </div>
      </div>
    </header>
  );
}
