import SignupButton from './SignupButton';
import useSignup from '@/hooks/SignupForm/useSignup';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import PolicyAreementInput from './PolicyAreementInput';

export default function SignupForm() {
  const { signupReady } = useSignup();

  return (
    <form onSubmit={() => {}} className="flex flex-col items-center">
      <div className="flex flex-col gap-1">
        <UsernameInput />
        <PasswordInput />
        <PolicyAreementInput />
        <SignupButton isLoading={false} disabled={!signupReady} />
      </div>
    </form>
  );
}
