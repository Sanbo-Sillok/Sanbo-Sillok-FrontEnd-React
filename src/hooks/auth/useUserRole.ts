import useAuthStore from '@/stores/authStore';

export default function useUserRole() {
  const userRole = useAuthStore((state) => state.userRole);
  const setUserRole = useAuthStore((state) => state.setUserRole);

  return { userRole, setUserRole };
}
