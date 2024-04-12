import { create } from 'zustand';

interface SignupFormStore {
  username: string;
  password: string;
  passwordCheck: string;
  policyAgreement: boolean;

  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setPasswordCheck: (passwordCheck: string) => void;
  setPolicyAgreement: (policyAgreement: boolean) => void;
}

const useSignupFormStore = create<SignupFormStore>((set) => ({
  username: '',
  password: '',
  passwordCheck: '',
  policyAgreement: false,

  setUsername: (username: string) => set((state) => ({ ...state, username })),
  setPassword: (password: string) => set((state) => ({ ...state, password })),
  setPasswordCheck: (passwordCheck: string) => set((state) => ({ ...state, passwordCheck })),
  setPolicyAgreement: (policyAgreement: boolean) => set((state) => ({ ...state, policyAgreement })),
}));

export default useSignupFormStore;
