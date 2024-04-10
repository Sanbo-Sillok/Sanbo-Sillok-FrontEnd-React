import { useEffect } from 'react';
import useAfterMountEffect from '../useAfterMountEffect';
import useGetSignupFormValue from './useGetSignupFormValue';
import useSetSignupFormValue from './useSetSignupFormValue';
import { passwordReg } from '@/constants/auth';

export default function useSignup() {
  const { username, password, passwordCheck, isSame, isValidPassword, policyAgreement, signupReady } = useGetSignupFormValue();
  const { setIsSame, setIsValidPassword, setSignupReady } = useSetSignupFormValue();

  useAfterMountEffect(() => {
    if (password !== passwordCheck) setIsSame(false);
    else setIsSame(true);
  }, [password, passwordCheck]);

  useAfterMountEffect(() => {
    if (passwordReg.test(password)) setIsValidPassword(true);
    else setIsValidPassword(false);
  }, [password]);

  useEffect(() => {
    if (!!username && !!password && isSame && isValidPassword && policyAgreement) setSignupReady(true);
    else setSignupReady(false);
  }, [username, password, isSame, isValidPassword, policyAgreement]);

  return { signupReady };
}
