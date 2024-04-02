import { useEffect, useRef, useState } from 'react';
import ProfileSVG from '@/assets/ProfileSVG';

interface OptionButtonProps {
  showOption?: boolean;
}

export default function OptionButton({ showOption = true }: OptionButtonProps) {
  const [openOption, setOpenOption] = useState(false);
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (optionRef.current && !optionRef.current.contains(event.target as Node)) setOpenOption(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [optionRef]);

  return (
    <div className="relative flex h-10 w-10 items-center justify-center" ref={optionRef}>
      <button
        type="button"
        className="flex h-full w-full items-center justify-center rounded-lg duration-200 hover:bg-base-600 hover:bg-opacity-30"
        aria-label="my-info"
        onClick={() => setOpenOption((prev) => !prev)}
      >
        <ProfileSVG />
      </button>
      {openOption && showOption && (
        <div className="absolute right-1 top-14 flex min-w-max flex-col items-center justify-center gap-4 rounded-xl bg-base-200 p-2 shadow-lg dark:bg-base-600">
          <span className="p-2 dark:text-base-200">로그아웃</span>
        </div>
      )}
    </div>
  );
}
