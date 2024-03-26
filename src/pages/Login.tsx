import { Link, useNavigate } from 'react-router-dom';
import useAuthAxios from '../hooks/useAuthAxios';
import { LoginResponse } from '../types/api';
import useSetToken from '../hooks/useSetToken';
import { REFRESH_TOKEN } from '../constants/auth';

interface LoginFormData extends FormData {
  get(name: 'username' | 'password'): string;
}

export default function Login() {
  const authAxios = useAuthAxios();
  const { setAccessToken } = useSetToken();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginFormData = new FormData(event.currentTarget) as LoginFormData;

    const username = loginFormData.get('username');
    const password = loginFormData.get('password');

    const response = await authAxios.post<LoginResponse>('/auth/login', { username, password });

    const { access_token: accessToken, refresh_token: refreshToken } = response.data.token;

    setAccessToken(accessToken);
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken);

    if (response.status === 200) navigate('/');
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <img className="mb-10 mt-10" src="/favicon.ico" alt="산보실록 아이콘" width={100} height={100} />
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <div className="grid grid-cols-4 gap-1 mobile:flex mobile:flex-col">
          <div className="col-span-3 flex flex-col gap-1">
            <input className="rounded-md border p-2 dark:text-black" placeholder="Username" type="text" name="username" />
            <input className="rounded-md border p-2 dark:text-black" placeholder="Password" type="password" name="password" />
          </div>
          <button className="col-span-1 h-full w-full rounded-md bg-base-200 mobile:ml-0 mobile:mt-2 mobile:h-10" type="submit">
            로그인
          </button>
        </div>
        <div className="mb-8 mt-2 flex">
          <h1 className="mr-2 dark:text-zinc-300">회원이 아니신가요?</h1>
          <Link className="text-sanbo-blue" to="/signup">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
