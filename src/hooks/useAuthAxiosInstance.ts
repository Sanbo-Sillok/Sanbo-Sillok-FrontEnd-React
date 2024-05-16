import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useToken from './token/useToken';
import useSetToken from './token/useSetToken';
import { REFRESH_TOKEN } from '@/constants/auth';
import { RefreshResponse } from '@/types/apis/auth';

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).response !== undefined;
}

export default function useAuthAxiosInstance() {
  const navigate = useNavigate();

  const { accessToken } = useToken();
  const { setAccessToken } = useSetToken();

  const authAxios = axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async function getNewRefreshToken() {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      if (!refreshToken) navigate('/login');

      const refreshResponse = await axios.post<RefreshResponse>(`${import.meta.env.VITE_API_DOMAIN}/auth/token/refresh/`, {
        refresh: refreshToken,
      });
      const { access: newAccessToken } = refreshResponse.data;

      setAccessToken(newAccessToken);

      return newAccessToken;
    } catch (refreshError) {
      if (isAxiosError(refreshError) && refreshError.response?.status === 401) {
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/login');
      }

      return null;
    }
  }

  authAxios.interceptors.request.use(
    (config) => {
      const modifiedConfig = { ...config };
      if (accessToken) modifiedConfig.headers.Authorization = `Bearer ${accessToken}`;

      return modifiedConfig;
    },
    (error) => Promise.reject(error),
  );

  authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest.retry) {
        originalRequest.retry = true;
        const newAccessToken = await getNewRefreshToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // eslint-disable-next-line @typescript-eslint/return-await
        return authAxios(originalRequest);
      }

      return Promise.reject(error);
    },
  );

  return authAxios;
}
