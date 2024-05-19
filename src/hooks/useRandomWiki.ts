import { useNavigate } from 'react-router-dom';
import useRandomWikiQuery from '@/apis/queries/useRandomWikiQuery';

export default function useRandomWiki() {
  const { isLoading, refetch } = useRandomWikiQuery();
  const navigate = useNavigate();

  const navigateRandomPage = () => {
    refetch().then((response) => navigate(`/wiki/${response.data}`));
  };

  return { navigateRandomPage, isLoading };
}
