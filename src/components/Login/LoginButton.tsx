import { createElement } from 'react';

interface LoginButtonProps {
  isLoading: boolean;
}

export default function LoginButton({ isLoading }: LoginButtonProps) {
  return createElement(
    isLoading ? 'span' : 'button',
    {
      className: 'col-span-1 flex h-full w-full items-center justify-center rounded-md bg-base-200 mobile:ml-0 mobile:mt-2 mobile:h-10',
      type: isLoading ? undefined : 'submit',
    },
    isLoading ? '로딩중' : '로그인',
  );
}
