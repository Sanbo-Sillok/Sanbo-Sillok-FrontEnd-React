import { useState } from 'react';
import useSignupFormStore from '@/stores/signupFormStore';
import useAfterMountEffect from '../useAfterMountEffect';
import { passwordReg } from '@/constants/auth';

export default function usePassword() {
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isSame, setIsSame] = useState(true);

  const password = useSignupFormStore((state) => state.password);
  const setPassword = useSignupFormStore((state) => state.setPassword);
  const passwordCheck = useSignupFormStore((state) => state.passwordCheck);
  const setPasswordCheck = useSignupFormStore((state) => state.setPasswordCheck);

  useAfterMountEffect(() => {
    if (password !== passwordCheck) setIsSame(false);
    else setIsSame(true);
  }, [password, passwordCheck]);

  useAfterMountEffect(() => {
    if (passwordReg.test(password)) setIsValidPassword(true);
    else setIsValidPassword(false);
  }, [password]);

  return { password, setPassword, passwordCheck, setPasswordCheck, isValidPassword, isSame };
}
