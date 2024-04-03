import LoginButton from './LoginButton';

interface LoginFormProps {
  isLoading: boolean;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function LoginForm({ isLoading, handleLogin }: LoginFormProps) {
  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-1 mobile:flex mobile:flex-col">
        <div className="col-span-3 flex flex-col gap-1">
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
        </div>
        <LoginButton isLoading={isLoading} />
      </div>
    </form>
  );
}
