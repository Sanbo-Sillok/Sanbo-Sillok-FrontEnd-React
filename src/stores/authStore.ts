import { create } from 'zustand';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  setAccessToken: (accessToken: string | null) => set((state) => ({ ...state, accessToken })),
  setRefreshToken: (refreshToken: string | null) => set((state) => ({ ...state, refreshToken })),
}));

export default useAuthStore;
