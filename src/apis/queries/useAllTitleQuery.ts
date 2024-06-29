import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@/constants/queryKey';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { WikiTitle } from '@/types/wiki';

export function useAllTitleQuery() {
  const authAxios = useAuthAxiosInstance();

  const getAllTitles = async () => {
    const response = await authAxios.get<WikiTitle[]>('/post');

    return response.data.sort((a, b) => (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase() ? -1 : 1));
  };

  return useQuery({
    queryKey: [REACT_QUERY_KEYS.ALL_TITLES],
    queryFn: getAllTitles,
    staleTime: 10 * 1000,
  });
}
