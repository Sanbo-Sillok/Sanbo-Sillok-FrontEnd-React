import useAuthStore from '@/stores/authStore';

export default function useSetToken() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

  return { setAccessToken, setRefreshToken };
}
