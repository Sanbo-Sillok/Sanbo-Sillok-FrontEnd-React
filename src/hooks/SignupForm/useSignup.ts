import { useEffect, useState } from 'react';
import useUsername from './useUsername';
import usePassword from './usePassword';
import usePolicyAgreement from './usePolicyAgreement';

export default function useSignup() {
  const [signupReady, setSignupReady] = useState(false);

  const { username } = useUsername();
  const { password, isSame, isValidPassword } = usePassword();
  const { policyAgreement } = usePolicyAgreement();

  useEffect(() => {
    if (!!username && !!password && isSame && isValidPassword && policyAgreement) setSignupReady(true);
    else setSignupReady(false);
  }, [username, password, isSame, isValidPassword, policyAgreement]);

  return { signupReady };
}
