import useSignupFormStore from '@/stores/signupFormStore';

export default function useUsername() {
  const username = useSignupFormStore((state) => state.username);
  const setUsername = useSignupFormStore((state) => state.setUsername);

  return { username, setUsername };
}
