import useCheckUsername from '@/hooks/SignupForm/useCheckUsername';

export default function CheckUsernameButton() {
  const { isValidUsername, check } = useCheckUsername();

  return (
    <button
      type="button"
      className="flex h-10 w-full items-center justify-center rounded bg-base-200 p-2"
      onClick={check}
      disabled={isValidUsername}
    >
      {isValidUsername ? '사용가능' : '중복확인'}
    </button>
  );
}
