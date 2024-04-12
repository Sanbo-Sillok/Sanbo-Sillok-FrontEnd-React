import ProfileSVG from '@/assets/ProfileSVG';
import useLogoutMutation from '@/apis/mutations/useLogoutMutation';
import useToggleOption from '@/hooks/useToggleOption';

interface OptionButtonProps {
  showOption?: boolean;
}

export default function OptionButton({ showOption = true }: OptionButtonProps) {
  const { isOpen, optionRef, toggle } = useToggleOption();
  const { mutate: logout, isPending } = useLogoutMutation();

  return (
    <div className="relative flex h-10 w-10 items-center justify-center" ref={optionRef}>
      <button
        type="button"
        className="flex h-full w-full items-center justify-center rounded-lg duration-200 hover:bg-base-600 hover:bg-opacity-30"
        aria-label="my-info"
        onClick={toggle}
      >
        <ProfileSVG />
      </button>
      {isOpen && showOption && (
        <div className="absolute right-1 top-14 flex min-w-max flex-col items-center justify-center gap-4 rounded-xl bg-base-200 p-2 shadow-lg dark:bg-base-600">
          <button type="button" className="p-2 dark:text-base-200" aria-label="logout" onClick={() => logout()} disabled={isPending}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
