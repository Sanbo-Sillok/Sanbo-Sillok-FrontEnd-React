import useLoginMutation from '@/apis/mutations/useLoginMutation';
import { LoginFormData, LOGIN_FORM_KEY } from '@/utils/LoginFormData';

export default function useLogin() {
  const { mutate: login, isPending } = useLoginMutation();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginFormData = new FormData(event.currentTarget) as LoginFormData;

    const username = loginFormData.get(LOGIN_FORM_KEY.USERNAME);
    const password = loginFormData.get(LOGIN_FORM_KEY.PASSWORD);

    login({ username, password });
  };

  return { onSubmit, isLoading: isPending };
}
