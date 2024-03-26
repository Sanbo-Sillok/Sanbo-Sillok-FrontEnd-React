import { create } from 'zustand';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  setAccessToken: (accessToken: string) => set((state) => ({ ...state, accessToken })),
  setRefreshToken: (refreshToken: string) => set((state) => ({ ...state, refreshToken })),
}));

export default useAuthStore;
