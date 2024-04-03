import { createElement } from 'react';

interface SaveButtonProps {
  disabled: boolean;
}

export default function SaveButton({ disabled }: SaveButtonProps) {
  return createElement(
    disabled ? 'span' : 'button',
    {
      className: 'rounded-lg bg-base-200 px-4 py-2 duration-300 hover:bg-base-300',
      type: disabled ? undefined : 'submit',
    },
    disabled ? 'Loading' : 'Save',
  );
}
