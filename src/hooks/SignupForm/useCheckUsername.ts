import useCheckUsernameQuery from '@/apis/queries/useCheckUsernameQuery';
import useSignupFormStore from '@/stores/signupFormStore';

export default function useCheckUsername() {
  const isValidUsername = useSignupFormStore((state) => state.checkUsername);
  const setIsValidUsername = useSignupFormStore((state) => state.setCheckusername);

  const { refetch } = useCheckUsernameQuery();

  const check = () => {
    refetch().then((response) => {
      if (response.data) {
        alert('이미 존재하는 계정입니다.');
        setIsValidUsername(false);
      } else {
        alert('사용 가능한 계정입니다.');
        setIsValidUsername(true);
      }
    });
  };

  return { isValidUsername, setIsValidUsername, check };
}
