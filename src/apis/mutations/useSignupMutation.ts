import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { REFRESH_TOKEN } from '@/constants/auth';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import useSetToken from '@/hooks/useSetToken';
import { SignupBody, SignupResponse } from '@/types/api';
import useSignup from '@/hooks/SignupForm/useSignup';

export default function useSignupMutation() {
  const authAxios = useAuthAxiosInstance();
  const { resetSignupForm } = useSignup();
  const { setAccessToken } = useSetToken();
  const navigate = useNavigate();

  const signup = async ({ username, password }: { username: string; password: string }) => {
    const response = await authAxios.post<SignupResponse, AxiosResponse<SignupResponse, SignupBody>>('/auth/signup', {
      username,
      password,
    });

    return response.data;
  };

  const onSuccess = (responseData: SignupResponse) => {
    const { access_token: accessToken, refresh_token: refreshToken } = responseData.token;

    setAccessToken(accessToken);
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken);

    resetSignupForm();
    navigate('/');
  };

  const onError = (err: AxiosError) => {
    if (err.response?.status === 400) alert('이미 존재하는 계정입니다.');
  };

  return useMutation({
    mutationFn: signup,
    onSuccess,
    onError,
  });
}
