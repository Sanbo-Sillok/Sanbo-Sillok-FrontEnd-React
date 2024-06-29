import { create } from 'zustand';
import { UserRole } from '@/types/apis/auth';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  userRole: UserRole | null;

  setAccessToken: (accessToken: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setUserRole: (userRole: UserRole | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  userRole: null,

  setAccessToken: (accessToken: string | null) => set((state) => ({ ...state, accessToken })),
  setRefreshToken: (refreshToken: string | null) => set((state) => ({ ...state, refreshToken })),
  setUserRole: (userRole: UserRole | null) => set((state) => ({ ...state, userRole })),
}));

export default useAuthStore;
