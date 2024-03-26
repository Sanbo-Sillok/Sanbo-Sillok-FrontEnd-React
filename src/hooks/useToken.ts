import useAuthStore from '../stores/authStore';

export default function useToken() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  return { accessToken, refreshToken };
}
