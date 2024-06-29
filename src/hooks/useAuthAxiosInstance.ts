import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import useToken from './auth/useToken';
import useSetToken from './auth/useSetToken';
import { REFRESH_TOKEN } from '@/constants/auth';
import { RefreshBody, RefreshResponse } from '@/types/apis/auth';
import { SERVER_AUTH_ERROR_STATUS_CODE } from '@/constants/serverStatusCode';

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
      const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!storedRefreshToken) return null;

      const refreshBody = {
        refreshToken: storedRefreshToken,
      };

      const refreshResponse = await axios.post<RefreshBody, AxiosResponse<RefreshResponse>>(
        `${import.meta.env.VITE_API_DOMAIN}/token/refresh`,
        refreshBody,
      );

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;

      localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
      setAccessToken(newAccessToken);

      return newAccessToken;
    } catch (refreshError) {
      if (isAxiosError(refreshError) && refreshError.response?.status === SERVER_AUTH_ERROR_STATUS_CODE) {
        localStorage.removeItem(REFRESH_TOKEN);

        return null;
      }

      return null;
    }
  }

  authAxios.interceptors.request.use(
    (config) => {
      const modifiedConfig = { ...config };
      if (modifiedConfig.url === '/login' || modifiedConfig.url === '/token/refresh') return modifiedConfig;

      if (accessToken) modifiedConfig.headers.Authorization = `Bearer ${accessToken}`;
      return modifiedConfig;
    },
    (error) => Promise.reject(error),
  );

  authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.config.url === '/login') return Promise.reject(error);

      if (error.response.status === SERVER_AUTH_ERROR_STATUS_CODE && !originalRequest.retry) {
        originalRequest.retry = true;
        const newAccessToken = await getNewRefreshToken();
        if (!newAccessToken) {
          navigate('/login');

          return Promise.reject(error);
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // eslint-disable-next-line @typescript-eslint/return-await
        return authAxios(originalRequest);
      }

      return Promise.reject(error);
    },
  );

  return authAxios;
}
