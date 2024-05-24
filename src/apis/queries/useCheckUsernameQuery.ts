import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@/constants/queryKey';
import useUsername from '@/hooks/SignupForm/useUsername';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { CheckUsernameResponse } from '@/types/apis/auth';

export default function useCheckUsernameQuery() {
  const authAxios = useAuthAxiosInstance();
  const { username } = useUsername();

  const checkUsername = async () => {
    const response = await authAxios.get<CheckUsernameResponse>(`/checkUserName/${username}`);

    return response.data.isExist;
  };

  return useQuery({
    queryKey: [REACT_QUERY_KEYS.CHECK_USERNAME, username],
    queryFn: checkUsername,
    enabled: false,
  });
}
