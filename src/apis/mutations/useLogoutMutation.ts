import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { REFRESH_TOKEN } from '@/constants/auth';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import useSetToken from '@/hooks/useSetToken';
import { LogoutResponse } from '@/types/api';

export default function useLogoutMutation() {
  const authAxios = useAuthAxiosInstance();
  const { setAccessToken, setRefreshToken } = useSetToken();
  const navigate = useNavigate();

  const logout = async () => {
    const response = await authAxios.delete<LogoutResponse>('/auth/login');

    return response;
  };

  const onSuccess = () => {
    localStorage.removeItem(REFRESH_TOKEN);
    setAccessToken(null);
    setRefreshToken(null);

    navigate('/login');
  };

  const onError = () => {
    alert('문제가 발생했습니다. 잠시후 다시 시도해주세요.');
  };

  return useMutation({
    mutationFn: logout,
    onSuccess,
    onError,
  });
}
