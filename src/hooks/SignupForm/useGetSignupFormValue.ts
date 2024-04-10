import useSignupFormStore from '@/stores/signupFormStore';

export default function useGetSignupFormValue() {
  const username = useSignupFormStore((state) => state.username);
  const password = useSignupFormStore((state) => state.password);
  const passwordCheck = useSignupFormStore((state) => state.passwordCheck);
  const isSame = useSignupFormStore((state) => state.isSame);
  const isValidPassword = useSignupFormStore((state) => state.isValidPassword);
  const policyAgreement = useSignupFormStore((state) => state.policyAgreement);
  const signupReady = useSignupFormStore((state) => state.signupReady);

  return { username, password, passwordCheck, isSame, isValidPassword, policyAgreement, signupReady };
}
