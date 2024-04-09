import { createElement } from 'react';

interface SignupButtonProps {
  isLoading: boolean;
  disabled: boolean;
}

const getSignupButtonInnerText = (isLoading: boolean, disabled: boolean) => {
  if (isLoading) return 'Loading...';
  if (disabled) return '필수 영역을 모두 입력해주세요';
  return '회원가입';
};

export default function SignupButton({ isLoading, disabled }: SignupButtonProps) {
  return createElement(
    isLoading || disabled ? 'span' : 'button',
    {
      className: 'w-full h-10 p-2 rounded bg-base-200 flex items-center justify-center',
      type: isLoading ? undefined : 'submit',
    },
    getSignupButtonInnerText(isLoading, disabled),
  );
}
