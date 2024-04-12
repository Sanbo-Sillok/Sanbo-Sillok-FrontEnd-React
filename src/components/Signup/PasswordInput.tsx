import TextInput from '../common/TextInput';
import WarningText from './WarningText';
import usePassword from '@/hooks/SignupForm/usePassword';

export default function PasswordInput() {
  const { password, passwordCheck, setPassword, setPasswordCheck, isSame, isValidPassword } = usePassword();

  return (
    <>
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
    </>
  );
}
