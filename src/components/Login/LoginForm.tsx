import { LOGIN_FORM_KEY } from '@/utils/LoginFormData';
import LoginButton from './LoginButton';

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm({ isLoading, onSubmit }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-1 mobile:flex mobile:flex-col">
        <div className="col-span-3 flex flex-col gap-1">
          <input
            className="rounded-md border border-base-200 p-2 focus:outline-none dark:border-base-400 dark:bg-base-600 dark:text-base-200"
            placeholder="Username"
            type="text"
            name={LOGIN_FORM_KEY.USERNAME}
          />
          <input
            className="rounded-md border border-base-200 p-2 focus:outline-none dark:border-base-400 dark:bg-base-600 dark:text-base-200"
            placeholder="Password"
            type="password"
            name={LOGIN_FORM_KEY.PASSWORD}
          />
        </div>
        <LoginButton isLoading={isLoading} />
      </div>
    </form>
  );
}
