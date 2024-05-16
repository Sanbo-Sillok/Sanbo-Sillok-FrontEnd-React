import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { REFRESH_TOKEN } from '@/constants/auth';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import useSetToken from '@/hooks/token/useSetToken';
import { LoginBody, LoginResponse } from '@/types/apis/auth';

export default function useLoginMutation() {
  const authAxios = useAuthAxiosInstance();
  const { setAccessToken } = useSetToken();
  const navigate = useNavigate();

  const login = async ({ username, password }: { username: string; password: string }) => {
    const response = await authAxios.post<LoginResponse, AxiosResponse<LoginResponse>, LoginBody>('/auth/login', { username, password });

    return response.data;
  };

  const onSuccess = (responseData: LoginResponse) => {
    const { access_token: accessToken, refresh_token: refreshToken } = responseData.token;

    setAccessToken(accessToken);
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken);

    navigate('/');
  };

  const onError = (err: AxiosError) => {
    if (err.response?.status === 400) alert('아이디 또는 패스워드가 틀렸습니다.');
  };

  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });
}
