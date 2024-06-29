import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { SignupBody, SignupResponse } from '@/types/apis/auth';
import useSignup from '@/hooks/SignupForm/useSignup';

export default function useSignupMutation() {
  const authAxios = useAuthAxiosInstance();
  const navigate = useNavigate();
  const { resetSignupForm } = useSignup();

  const signup = async ({ username, password, uploadImage }: { username: string; password: string; uploadImage: File }) => {
    const response = await authAxios.post<SignupResponse, AxiosResponse<SignupResponse, SignupBody>>(
      '/signup',
      {
        username,
        password,
        studentIdImage: uploadImage,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  };

  const onSuccess = () => {
    /* const { access_token: accessToken, refresh_token: refreshToken } = responseData.token;

    setAccessToken(accessToken);
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken);

    resetSignupForm(); */
    resetSignupForm();
    alert('신청이 완료되었습니다. 승인 이후 로그인이 가능합니다.');
    navigate('/login');
  };

  const onError = () => {
    alert('잠시후 다시 시도해주세요');
  };

  return useMutation({
    mutationFn: signup,
    onSuccess,
    onError,
  });
}
