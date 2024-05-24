import { create } from 'zustand';

interface SignupFormStore {
  username: string;
  checkUsername: boolean;
  password: string;
  passwordCheck: string;
  policyAgreement: boolean;
  uploadImage: File | null;

  setUsername: (username: string) => void;
  setCheckusername: (checkUsername: boolean) => void;
  setPassword: (password: string) => void;
  setPasswordCheck: (passwordCheck: string) => void;
  setPolicyAgreement: (policyAgreement: boolean) => void;
  setUploadImage: (uploadImage: File | null) => void;
}

const useSignupFormStore = create<SignupFormStore>((set) => ({
  username: '',
  checkUsername: false,
  password: '',
  passwordCheck: '',
  policyAgreement: false,
  uploadImage: null,

  setUsername: (username: string) => set((state) => ({ ...state, username })),
  setCheckusername: (checkUsername: boolean) => set((state) => ({ ...state, checkUsername })),
  setPassword: (password: string) => set((state) => ({ ...state, password })),
  setPasswordCheck: (passwordCheck: string) => set((state) => ({ ...state, passwordCheck })),
  setPolicyAgreement: (policyAgreement: boolean) => set((state) => ({ ...state, policyAgreement })),
  setUploadImage: (uploadImage: File | null) => set((state) => ({ ...state, uploadImage })),
}));

export default useSignupFormStore;
