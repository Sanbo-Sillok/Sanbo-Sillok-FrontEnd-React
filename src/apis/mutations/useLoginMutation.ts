import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import useSetToken from '@/hooks/token/useSetToken';
import { LoginBody, LoginResponse } from '@/types/apis/auth';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ACCESS_TOKEN, ACCESS_TOKEN_LOCAL_STORAGE_EXPIRE } from '@/constants/auth';

export default function useLoginMutation() {
  const authAxios = useAuthAxiosInstance();
  const { setAccessToken } = useSetToken();
  const [, saveAccessToken] = useLocalStorage<string>(ACCESS_TOKEN, null, { expire: ACCESS_TOKEN_LOCAL_STORAGE_EXPIRE }); // 1시간
  const navigate = useNavigate();

  const login = async ({ username, password }: LoginBody) => {
    const response = await authAxios.post<LoginResponse, AxiosResponse<LoginResponse>, LoginBody>('/login', { username, password });

    return response.data;
  };

  const onSuccess = (responseData: LoginResponse) => {
    const { accessToken } = responseData;

    // FIXME: refreshToken으로 변경
    saveAccessToken(accessToken);

    // TODO: refreshToken 적용
    setAccessToken(accessToken);
    // window.localStorage.setItem(REFRESH_TOKEN, refreshToken);

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
