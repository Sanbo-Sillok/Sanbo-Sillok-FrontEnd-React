interface SignupButtonProps {
  isLoading: boolean;
  disabled: boolean;
}

const signupButtonClassName = 'w-full h-10 p-2 rounded bg-base-200 flex items-center justify-center';

export default function SignupButton({ isLoading, disabled }: SignupButtonProps) {
  if (isLoading) return <span className={signupButtonClassName}>Loading</span>;
  if (disabled) return <span className={signupButtonClassName}>필수 영역을 모두 입력해주세요</span>;

  return (
    <button type="submit" className={signupButtonClassName}>
      회원가입
    </button>
  );
}
