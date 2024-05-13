import { useSuspenseQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@/constants/queryKey';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { ExistWikiData, NotExistWikiData } from '@/types/wiki';

export default function useWikiSuspenseQuery(pageTitle: string) {
  const authAxios = useAuthAxiosInstance();

  const getWikiData = async () => {
    const response = await authAxios.get<ExistWikiData | NotExistWikiData>(`/post/${pageTitle}`);

    return response.data;
  };

  return useSuspenseQuery({
    queryKey: [REACT_QUERY_KEYS.WIKI_DETAIL, pageTitle],
    queryFn: getWikiData,
    staleTime: 5 * 1000,
    retry: false,
  });
}
