import { useMutation } from '@tanstack/react-query';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import useAdminSuspenseQuery from '../queries/useAdminSuspenseQuery';

export default function useAcceptSignup() {
  const authAxios = useAuthAxiosInstance();
  const { refetch } = useAdminSuspenseQuery();

  const accept = async (index: number) => {
    await authAxios.patch(`/admin/${index}`);
  };

  const onSuccess = () => {
    alert('승인되었습니다.');
    refetch();
  };

  const onError = () => {
    alert('잠시후 다시 시도해주세요.');
  };

  return useMutation({
    mutationFn: accept,
    onSuccess,
    onError,
  });
}
