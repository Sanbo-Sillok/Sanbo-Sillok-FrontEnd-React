import useLoginMutation from '@/apis/mutations/useLoginMutation';
import { LoginFormData } from '@/utils/LoginFormData';

export default function useLogin() {
  const { mutate: login, isPending } = useLoginMutation();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginFormData = new FormData(event.currentTarget) as LoginFormData;

    const username = loginFormData.get('username');
    const password = loginFormData.get('password');

    login({ username, password });
  };

  return { onSubmit, isLoading: isPending };
}
