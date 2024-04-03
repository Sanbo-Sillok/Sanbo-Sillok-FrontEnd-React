import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthAxiosInstance from './useAuthAxiosInstance';
import { LogoutResponse } from '@/types/api';
import { REFRESH_TOKEN } from '@/constants/auth';
import useSetToken from './useSetToken';

export default function useLogout() {
  const authAxiosInstance = useAuthAxiosInstance();
  const { setAccessToken, setRefreshToken } = useSetToken();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);

    try {
      const response = await authAxiosInstance.delete<LogoutResponse>('/auth/login');

      if (response.status === 202) {
        localStorage.removeItem(REFRESH_TOKEN);
        setAccessToken(null);
        setRefreshToken(null);

        navigate('/login');
      }
    } catch (err) {
      alert('잠시 후 다시 시도해주세요');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, logout };
}
