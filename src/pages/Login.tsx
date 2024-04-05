import { Link } from 'react-router-dom';
import useLogin from '@/hooks/useLogin';
import LoginForm from '@/components/Login/LoginForm';

export default function Login() {
  const { isLoading, login } = useLogin();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <img className="mb-10 mt-10" src="/favicon.ico" alt="산보실록 아이콘" width={100} height={100} />
      <LoginForm isLoading={isLoading} handleLogin={login} />
      <div className="mb-8 mt-2 flex">
        <h1 className="mr-2 dark:text-base-200">회원이 아니신가요?</h1>
        <Link className="text-sanbo-blue" to="/signup">
          회원가입
        </Link>
      </div>
    </div>
  );
}
