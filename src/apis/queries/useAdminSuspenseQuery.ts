import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { PendingUserDataResponse } from '@/types/apis/auth';

export default function useAdminSuspenseQuery() {
  const authAxios = useAuthAxiosInstance();

  const getPendingUserList = async () => {
    const response = await authAxios.get<PendingUserDataResponse[]>('/admin');

    return response.data;
  };

  return useSuspenseQuery({
    queryKey: [],
    queryFn: getPendingUserList,
  });
}
