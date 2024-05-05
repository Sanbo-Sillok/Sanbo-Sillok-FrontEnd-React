import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate(-1)} className="rounded-lg bg-base-200 px-4 py-2 duration-300 hover:bg-base-300">
      취소
    </button>
  );
}
