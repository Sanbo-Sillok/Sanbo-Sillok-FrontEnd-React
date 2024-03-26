import axios from 'axios';
import useSetToken from './useSetToken';
import useToken from './useToken';
import { REFRESH_TOKEN } from '../constants/auth';

export default function useAuthAxios() {
  const { accessToken } = useToken();
  const { setAccessToken } = useSetToken();

  const authAxios = axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN,
    headers: {
      'Content-Type': 'application/json',
    },
  });

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

        try {
          const refreshToken = localStorage.getItem(REFRESH_TOKEN);

          const response = await axios.post(`${import.meta.env.VITE_API_DOMAIN}/auth/token/refresh/`, { refreshToken });
          const { accessToken: newAccessToken } = response.data;

          setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // eslint-disable-next-line @typescript-eslint/return-await
          return authAxios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return authAxios;
}
