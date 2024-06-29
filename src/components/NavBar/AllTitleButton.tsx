import AllTitleSVG from '@/assets/AllTitleSVG';
import useRandomWiki from '@/hooks/useRandomWiki';

export default function AllTitleButton() {
  // FIXME: 모든 제목 가져오기 훅으로 수정
  const { isLoading, navigateRandomPage } = useRandomWiki();

  return (
    <button
      type="button"
      aria-label="all title"
      disabled={isLoading}
      onClick={navigateRandomPage}
      data-tooltip="모든 페이지 목록 조회"
      data-flow="down"
      className="flex h-10 w-10 items-center justify-center rounded-lg duration-200 hover:bg-base-600 hover:bg-opacity-30 mobile:hidden"
    >
      <AllTitleSVG />
    </button>
  );
}
