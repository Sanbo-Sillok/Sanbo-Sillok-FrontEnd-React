import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import useSetToken from '@/hooks/auth/useSetToken';
import { LoginBody, LoginResponse } from '@/types/apis/auth';
import { REFRESH_TOKEN } from '@/constants/auth';
import { USERNAME_OR_PASSWORD_WRONG } from '@/constants/serverStatusCode';

export default function useLoginMutation() {
  const authAxios = useAuthAxiosInstance();
  const { setAccessToken } = useSetToken();
  const navigate = useNavigate();

  const login = async ({ username, password }: LoginBody) => {
    const response = await authAxios.post<LoginResponse, AxiosResponse<LoginResponse>, LoginBody>('/login', { username, password });

    return response.data;
  };

  const onSuccess = (responseData: LoginResponse) => {
    const { accessToken, refreshToken } = responseData;

    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    setAccessToken(accessToken);

    navigate('/');
  };

  const onError = (err: AxiosError) => {
    if (err.response?.status === USERNAME_OR_PASSWORD_WRONG) alert('아이디 또는 패스워드가 틀렸습니다.');
  };

  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });
}
