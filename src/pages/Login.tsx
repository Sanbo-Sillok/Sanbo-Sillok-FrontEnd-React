import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoginForm from '@/components/Login/LoginForm';
import useLoginMutation from '@/apis/mutations/useLoginMutation';
import { LoginFormData } from '@/utils/LoginFormData';

export default function Login() {
  const { mutate: login, isPending } = useLoginMutation();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginFormData = new FormData(event.currentTarget) as LoginFormData;

    const username = loginFormData.get('username');
    const password = loginFormData.get('password');

    login({ username, password });
  };

  return (
    <>
      <Helmet>
        <title>산보실록: 로그인</title>
      </Helmet>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <img className="mb-10 mt-10" src="/favicon.ico" alt="산보실록 아이콘" width={100} height={100} />
        <LoginForm isLoading={isPending} handleLogin={handleLogin} />
        <div className="mb-8 mt-2 flex">
          <h1 className="mr-2 dark:text-base-200">회원이 아니신가요?</h1>
          <Link className="text-sanbo-blue" to="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </>
  );
}
