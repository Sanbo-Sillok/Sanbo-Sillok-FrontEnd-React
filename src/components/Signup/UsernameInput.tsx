import TextInput from '../common/TextInput';
import useUsername from '@/hooks/SignupForm/useUsername';

export default function UsernameInput() {
  const { username, setUsername } = useUsername();

  return <TextInput placeholder="사용자 이름" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />;
}
