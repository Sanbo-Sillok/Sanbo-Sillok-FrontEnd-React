import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';
import useSetToken from './useSetToken';
import useToken from './useToken';
import { REFRESH_TOKEN } from '../constants/auth';
import { RefreshResponse } from '../types/api';

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).response !== undefined;
}

export default function useAuthAxios() {
  const navigate = useNavigate();

  const { accessToken } = useToken();
  const { setAccessToken } = useSetToken();

  const authAxios = axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async function getNewRefreshToken(requestConfig: AxiosRequestConfig) {
    const originalRequest = { ...requestConfig };

    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      const refreshResponse = await axios.post<RefreshResponse>(`${import.meta.env.VITE_API_DOMAIN}/auth/token/refresh/`, {
        refresh: refreshToken,
      });
      const { access: newAccessToken } = refreshResponse.data;

      setAccessToken(newAccessToken);

      if (!originalRequest.headers) originalRequest.headers = {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // eslint-disable-next-line @typescript-eslint/return-await
      return authAxios(originalRequest);
    } catch (refreshError) {
      if (isAxiosError(refreshError) && refreshError.response?.status === 401) {
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/login');
      }

      return Promise.reject(refreshError);
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
        return getNewRefreshToken(originalRequest);
      }

      return Promise.reject(error);
    },
  );

  return authAxios;
}
