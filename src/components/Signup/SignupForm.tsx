import TextInput from '../common/TextInput';
import WarningText from './WarningText';
import ShowPolicyButton from './ShowPolicyButton';
import SignupButton from './SignupButton';
import useSetSignupFormValue from '@/hooks/SignupForm/useSetSignupFormValue';
import useSignup from '@/hooks/SignupForm/useSignup';
import useGetSignupFormValue from '@/hooks/SignupForm/useGetSignupFormValue';

export default function SignupForm() {
  const { signupReady } = useSignup();
  const { username, password, passwordCheck, isSame, isValidPassword, policyAgreement } = useGetSignupFormValue();
  const { setUsername, setPassword, setPasswordCheck, setPolicyAgreement } = useSetSignupFormValue();

  return (
    <form onSubmit={() => {}} className="flex flex-col items-center">
      <div className="flex flex-col gap-1">
        <TextInput placeholder="사용자 이름" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <TextInput
          placeholder="패스워드"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {!isValidPassword && <WarningText>8자리 이상의 대문자, 소문자, 특수문자, 숫자로 구성해주세요.</WarningText>}
        <TextInput
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
  );
}
