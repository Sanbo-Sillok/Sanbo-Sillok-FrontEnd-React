import { useNavigate } from 'react-router-dom';
import useRandomWikiQuery from '@/apis/queries/useRandomWikiQuery';

export default function useRandomWiki() {
  const { data: title, isLoading, refetch } = useRandomWikiQuery();
  const navigate = useNavigate();

  const navigateRandomPage = () => {
    if (!title) return;

    refetch();
    navigate(`/wiki/${title}`);
  };

  return { navigateRandomPage, isLoading };
}
