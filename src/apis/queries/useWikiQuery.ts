import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@/constants/queryKey';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { ExistWikiData, NotExistWikiData } from '@/types/wiki';

export default function useWikiQuery(url: string) {
  const authAxios = useAuthAxiosInstance();

  const getWikiData = async () => {
    const response = await authAxios.get<ExistWikiData | NotExistWikiData>(url);

    return response.data;
  };

  return useQuery({
    queryKey: [REACT_QUERY_KEYS.WIKI_DETAIL, url],
    queryFn: getWikiData,
    staleTime: 5 * 1000,
    retry: false,
    throwOnError: (error: AxiosError) => error.response!.status >= 500,
  });
}
