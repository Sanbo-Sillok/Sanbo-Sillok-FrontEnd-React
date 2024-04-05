import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import useAuthAxiosInstance from './useAuthAxiosInstance';
import useSetToken from './useSetToken';
import { LoginBody, LoginResponse } from '@/types/api';
import { REFRESH_TOKEN } from '@/constants/auth';
import { LoginFormData } from '@/utils/LoginFormData';

export default function useLogin() {
  const authAxios = useAuthAxiosInstance();
  const { setAccessToken } = useSetToken();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    try {
      event.preventDefault();

      const loginFormData = new FormData(event.currentTarget) as LoginFormData;

      const username = loginFormData.get('username');
      const password = loginFormData.get('password');

      const response = await authAxios.post<LoginResponse, AxiosResponse<LoginResponse>, LoginBody>('/auth/login', { username, password });

      const { access_token: accessToken, refresh_token: refreshToken } = response.data.token;

      setAccessToken(accessToken);
      window.localStorage.setItem(REFRESH_TOKEN, refreshToken);

      if (response.status === 200) navigate('/');
    } catch (err) {
      alert('잠시후 다시 시도해주세요');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, login };
}
