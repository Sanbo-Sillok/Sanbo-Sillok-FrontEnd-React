import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@/constants/queryKey';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { RandomWikiTitle } from '@/types/wiki';

export default function useRandomWikiQuery() {
  const authAxios = useAuthAxiosInstance();

  const getRandomWikiTitle = async () => {
    const response = await authAxios.get<RandomWikiTitle>('/post/random');

    return response.data.title;
  };

  return useQuery({
    queryKey: [REACT_QUERY_KEYS.RANDOM_WIKI_TITLE],
    queryFn: getRandomWikiTitle,
    enabled: false,
  });
}
