import RightChevronSVG from '@/assets/RightChevronSVG';

export default function SignUp() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-10">
      <img src="/favicon.ico" alt="산보실록 아이콘" width={100} height={100} />
      <form onSubmit={() => {}} className="flex flex-col items-center">
        <div className="flex flex-col gap-1">
          <input
            className="rounded-md border border-base-200 p-2 focus:outline-none dark:border-base-400 dark:bg-base-600 dark:text-base-200"
            placeholder="Username"
            type="text"
            name="username"
          />
          <input
            className="rounded-md border border-base-200 p-2 focus:outline-none dark:border-base-400 dark:bg-base-600 dark:text-base-200"
            placeholder="Password"
            type="password"
            name="password"
          />
          <input
            className="rounded-md border border-base-200 p-2 focus:outline-none dark:border-base-400 dark:bg-base-600 dark:text-base-200"
            placeholder="Password"
            type="password"
            name="password"
          />
          <div className="flex items-center justify-between gap-5 px-2 py-4">
            <label htmlFor="agreement" className="flex select-none gap-3 align-middle text-base-800 dark:text-base-300">
              <input id="agreement" name="agreement" className="scale-150" type="checkbox" />
              (필수) 산보실록 이용약관 동의
            </label>
            <button type="button" className="p-2" aria-label="show-detail">
              <RightChevronSVG width={12} height={12} />
            </button>
          </div>
          <button type="button" className="h-10 w-full rounded bg-base-200 p-2">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
