import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import useSetToken from '@/hooks/auth/useSetToken';
import { LogoutResponse } from '@/types/apis/auth';
import useLocalStorage from '@/hooks/useLocalStorage';
import useUserRole from '@/hooks/auth/useUserRole';

export default function useLogoutMutation() {
  const authAxios = useAuthAxiosInstance();
  const { setAccessToken, setRefreshToken } = useSetToken();
  const { setUserRole } = useUserRole();
  const [, , removeAccessToken] = useLocalStorage(ACCESS_TOKEN, null);
  const navigate = useNavigate();

  const logout = async () => {
    const response = await authAxios.delete<LogoutResponse>('/logout');

    return response;
  };

  const onSuccess = () => {
    localStorage.removeItem(REFRESH_TOKEN);
    setAccessToken(null);
    setRefreshToken(null);
    setUserRole(null);

    // FIXME: refresh token으로 변경
    removeAccessToken();

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
