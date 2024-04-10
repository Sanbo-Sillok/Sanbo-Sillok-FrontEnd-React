import { create } from 'zustand';

interface SignupFormStore {
  username: string;
  password: string;
  passwordCheck: string;
  isSame: boolean;
  isValidPassword: boolean;
  policyAgreement: boolean;
  signupReady: boolean;

  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setPasswordCheck: (passwordCheck: string) => void;
  setIsSame: (isSame: boolean) => void;
  setIsValidPassword: (isValidPassword: boolean) => void;
  setPolicyAgreement: (policyAgreement: boolean) => void;
  setSignupReady: (signupReady: boolean) => void;
}

const useSignupFormStore = create<SignupFormStore>((set) => ({
  username: '',
  password: '',
  passwordCheck: '',
  isSame: true,
  isValidPassword: true,
  policyAgreement: false,
  signupReady: false,

  setUsername: (username: string) => set((state) => ({ ...state, username })),
  setPassword: (password: string) => set((state) => ({ ...state, password })),
  setPasswordCheck: (passwordCheck: string) => set((state) => ({ ...state, passwordCheck })),
  setIsSame: (isSame: boolean) => set((state) => ({ ...state, isSame })),
  setIsValidPassword: (isValidPassword: boolean) => set((state) => ({ ...state, isValidPassword })),
  setPolicyAgreement: (policyAgreement: boolean) => set((state) => ({ ...state, policyAgreement })),
  setSignupReady: (signupReady: boolean) => set((state) => ({ ...state, signupReady })),
}));

export default useSignupFormStore;
