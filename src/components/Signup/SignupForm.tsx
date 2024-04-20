import SignupButton from './SignupButton';
import useSignup from '@/hooks/SignupForm/useSignup';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import PolicyAreementInput from './PolicyAreementInput';
import useUsername from '@/hooks/SignupForm/useUsername';
import usePassword from '@/hooks/SignupForm/usePassword';
import useSignupMutation from '@/apis/mutations/useSignupMutation';

export default function SignupForm() {
  const { signupReady } = useSignup();
  const { mutate: signup, isPending: isLoading } = useSignupMutation();
  const { username } = useUsername();
  const { password } = usePassword();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="flex flex-col gap-1">
        <UsernameInput />
        <PasswordInput />
        <PolicyAreementInput />
        <SignupButton isLoading={isLoading} disabled={!signupReady} />
      </div>
    </form>
  );
}
