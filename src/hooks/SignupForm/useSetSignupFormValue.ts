import useSignupFormStore from '@/stores/signupFormStore';

export default function useSetSignupFormValue() {
  const setUsername = useSignupFormStore((state) => state.setUsername);
  const setPassword = useSignupFormStore((state) => state.setPassword);
  const setPasswordCheck = useSignupFormStore((state) => state.setPasswordCheck);
  const setIsSame = useSignupFormStore((state) => state.setIsSame);
  const setIsValidPassword = useSignupFormStore((state) => state.setIsValidPassword);
  const setPolicyAgreement = useSignupFormStore((state) => state.setPolicyAgreement);
  const setSignupReady = useSignupFormStore((state) => state.setSignupReady);

  return {
    setUsername,
    setPassword,
    setPasswordCheck,
    setIsSame,
    setIsValidPassword,
    setPolicyAgreement,
    setSignupReady,
  };
}
