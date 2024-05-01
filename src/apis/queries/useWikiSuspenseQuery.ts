import { useSuspenseQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@/constants/queryKey';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { WikiData } from '@/types/wiki';

export default function useWikiSuspenseQuery(url: string) {
  const authAxios = useAuthAxiosInstance();

  const getWikiData = async () => {
    const response = await authAxios.get<WikiData>(url);

    return response.data;
  };

  return useSuspenseQuery({
    queryKey: [REACT_QUERY_KEYS.WIKI_DETAIL, url],
    queryFn: getWikiData,
    staleTime: 5 * 1000,
    retry: false,
  });
}