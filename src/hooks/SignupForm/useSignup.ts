import { useEffect, useState } from 'react';
import useUsername from './useUsername';
import usePassword from './usePassword';
import usePolicyAgreement from './usePolicyAgreement';
import useCheckUsername from './useCheckUsername';
import useSignupImage from './useSignupImage';

export default function useSignup() {
  const [signupReady, setSignupReady] = useState(false);

  const { username, setUsername } = useUsername();
  const { password, isSame, isValidPassword, setPassword, setPasswordCheck } = usePassword();
  const { policyAgreement, setPolicyAgreement } = usePolicyAgreement();
  const { isValidUsername, setIsValidUsername } = useCheckUsername();
  const { uploadImage, setUploadImage } = useSignupImage();

  const resetSignupForm = () => {
    setUsername('');
    setPassword('');
    setPasswordCheck('');
    setPolicyAgreement(false);
    setIsValidUsername(false);
    setUploadImage(null);
  };

  useEffect(() => {
    if (!!username && !!password && isSame && isValidPassword && policyAgreement && isValidUsername && !!uploadImage) setSignupReady(true);
    else setSignupReady(false);
  }, [username, password, isSame, isValidPassword, policyAgreement, isValidUsername, !!uploadImage]);

  return { signupReady, resetSignupForm };
}
