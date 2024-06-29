import { useNavigate } from 'react-router-dom';
import AllTitleSVG from '@/assets/AllTitleSVG';

export default function AllTitleButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="all title"
      onClick={() => navigate('/all')}
      data-tooltip="모든 페이지 목록 조회"
      data-flow="down"
      className="flex h-10 w-10 items-center justify-center rounded-lg duration-200 hover:bg-base-600 hover:bg-opacity-30 mobile:hidden"
    >
      <AllTitleSVG />
    </button>
  );
}
