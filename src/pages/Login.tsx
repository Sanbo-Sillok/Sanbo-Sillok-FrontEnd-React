import { Link } from 'react-router-dom';

const USERNAME = 'username';
const PASSWORD = 'password';

interface LoginFormData extends FormData {
  get(name: typeof USERNAME | typeof PASSWORD): string;
}

export default function Login() {
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget) as LoginFormData;

    // TODO: 로그인 API 연결
    console.log(data.get(USERNAME));
    console.log(data.get(PASSWORD));
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <img className="mb-10 mt-10" src="/favicon.ico" alt="산보실록 아이콘" width={100} height={100} />
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <div className="grid grid-cols-4 gap-1 mobile:flex mobile:flex-col">
          <div className="col-span-3 flex flex-col gap-1">
            <input className="rounded-md border p-2 dark:text-black" placeholder="Username" type="text" name={USERNAME} />
            <input className="rounded-md border p-2 dark:text-black" placeholder="Password" type="password" name={PASSWORD} />
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
