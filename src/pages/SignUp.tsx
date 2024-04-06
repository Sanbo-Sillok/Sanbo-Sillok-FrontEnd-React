import { useEffect, useState } from 'react';
import ShowPolicyButton from '@/components/Signup/ShowPolicyButton';
import SignupButton from '@/components/Signup/SignupButton';
import WarningText from '@/components/Signup/WarningText';
import { passwordReg } from '@/constants/auth';
import useAfterMountEffect from '@/hooks/useAfterMountEffect';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isSame, setIsSame] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [policyAgreement, setPolicyAgreement] = useState(false);
  const [signupReady, setSignupReady] = useState(false);

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

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-10">
      <img src="/favicon.ico" alt="산보실록 아이콘" width={100} height={100} />
      <form onSubmit={() => {}} className="flex flex-col items-center">
        <div className="flex flex-col gap-1">
          <input
            className="rounded-md border border-base-200 p-2 focus:outline-none dark:border-base-400 dark:bg-base-600 dark:text-base-200"
            placeholder="사용자 이름"
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            className="rounded-md border border-base-200 p-2 focus:outline-none dark:border-base-400 dark:bg-base-600 dark:text-base-200"
            placeholder="패스워드"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {!isValidPassword && <WarningText>8자리 이상의 대문자, 소문자, 특수문자, 숫자로 구성해주세요.</WarningText>}
          <input
            className="rounded-md border border-base-200 p-2 focus:outline-none dark:border-base-400 dark:bg-base-600 dark:text-base-200"
            placeholder="패스워드 확인"
            type="password"
            name="password"
            value={passwordCheck}
            onChange={(event) => setPasswordCheck(event.target.value)}
          />
          {!isSame && <WarningText>패스워드가 같지 않습니다.</WarningText>}
          <div className="flex items-center justify-between gap-5 px-2 py-4">
            <label htmlFor="agreement" className="flex select-none gap-3 align-middle text-base-800 dark:text-base-300">
              <input
                id="agreement"
                name="agreement"
                className="scale-150"
                type="checkbox"
                checked={policyAgreement}
                onChange={(event) => setPolicyAgreement(event.target.checked)}
              />
              (필수) 산보실록 이용약관 동의
            </label>
            <ShowPolicyButton />
          </div>
          <SignupButton isLoading={false} disabled={!signupReady} />
        </div>
      </form>
    </div>
  );
}
