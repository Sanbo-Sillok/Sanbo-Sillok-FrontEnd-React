interface LoginButtonProps {
  isLoading: boolean;
}

export default function LoginButton({ isLoading }: LoginButtonProps) {
  return isLoading ? (
    <span className="col-span-1 flex h-full w-full items-center justify-center rounded-md bg-base-200 mobile:ml-0 mobile:mt-2 mobile:h-10">
      Loading...
    </span>
  ) : (
    <button
      className="col-span-1 flex h-full w-full items-center justify-center rounded-md bg-base-200 mobile:ml-0 mobile:mt-2 mobile:h-10"
      type="submit"
    >
      로그인
    </button>
  );
}
