import RandomSVG from '@/assets/RandomSVG';
import useRandomWiki from '@/hooks/useRandomWiki';

export default function RandomTitleButton() {
  const { isLoading, navigateRandomPage } = useRandomWiki();

  return (
    <button
      type="button"
      aria-label="random wiki"
      disabled={isLoading}
      onClick={navigateRandomPage}
      data-tooltip="랜덤 페이지 이동"
      data-flow="down"
      className="flex h-10 w-10 items-center justify-center rounded-lg duration-200 hover:bg-base-600 hover:bg-opacity-30"
    >
      <RandomSVG />
    </button>
  );
}
