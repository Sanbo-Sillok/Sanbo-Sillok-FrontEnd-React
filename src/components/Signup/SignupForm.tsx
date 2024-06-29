import SignupButton from './SignupButton';
import useSignup from '@/hooks/SignupForm/useSignup';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import PolicyAreementInput from './PolicyAreementInput';
import useUsername from '@/hooks/SignupForm/useUsername';
import usePassword from '@/hooks/SignupForm/usePassword';
import useSignupMutation from '@/apis/mutations/useSignupMutation';
import CheckUsernameButton from './CheckUsernameButton';
import useSignupImage from '@/hooks/SignupForm/useSignupImage';
import SignupImageUploadButton from './SignupImageUploadButton';

export default function SignupForm() {
  const { signupReady } = useSignup();
  const { mutate: signup, isPending: isLoading } = useSignupMutation();
  const { uploadImage } = useSignupImage();
  const { username } = useUsername();
  const { password } = usePassword();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (uploadImage) signup({ username, password, uploadImage });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <UsernameInput />
          <CheckUsernameButton />
        </div>
        <PasswordInput />
        <PolicyAreementInput />
        <SignupImageUploadButton />
        <SignupButton isLoading={isLoading} disabled={!signupReady} />
      </div>
    </form>
  );
}
