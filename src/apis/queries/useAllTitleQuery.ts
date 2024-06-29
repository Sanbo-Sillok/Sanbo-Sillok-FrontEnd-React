import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@/constants/queryKey';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';

export function useAllTitleQuery() {
  const authAxios = useAuthAxiosInstance();

  const getAllTitles = async () => {
    const response = await authAxios.get('/post');

    return response.data;
  };

  return useQuery({
    queryKey: [REACT_QUERY_KEYS.ALL_TITLES],
    queryFn: getAllTitles,
  });
}
