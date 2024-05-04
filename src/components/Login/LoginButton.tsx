interface LoginButtonProps {
  isLoading: boolean;
}

const loginButtonClassName =
  'col-span-1 flex h-full w-full items-center justify-center rounded-md bg-base-200 mobile:ml-0 mobile:mt-2 mobile:h-10';

export default function LoginButton({ isLoading }: LoginButtonProps) {
  if (isLoading) return <span className={loginButtonClassName}>로딩중</span>;

  return (
    <button type="submit" className={loginButtonClassName}>
      로그인
    </button>
  );
}
