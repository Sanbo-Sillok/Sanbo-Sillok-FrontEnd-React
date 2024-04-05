import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import useAuthAxiosInstance from './useAuthAxiosInstance';

export default function useGetAxios<ReponseData>(url: string) {
  const authAxiosInstance = useAuthAxiosInstance();

  const [data, setData] = useState<ReponseData>();
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setData(undefined);
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await authAxiosInstance.get<ReponseData>(url);
      setData(response.data);
    } catch (err) {
      if (err instanceof AxiosError) setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, isLoading, refetch: fetchData };
}
