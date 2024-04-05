import { useState } from 'react';
import { AxiosError } from 'axios';
import useAuthAxiosInstance from './useAuthAxiosInstance';

export default function usePostAxios<ResponseData, Body>(url: string) {
  const authAxiosInstance = useAuthAxiosInstance();

  const [data, setData] = useState<ResponseData>();
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState(false);

  const postData = async (postBody: Body) => {
    setData(undefined);
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await authAxiosInstance.post<ResponseData>(url, postBody);
      setData(response.data);
    } catch (err) {
      if (err instanceof AxiosError) setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, postData };
}
