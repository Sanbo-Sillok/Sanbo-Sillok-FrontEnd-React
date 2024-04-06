import { useState } from 'react';
import RightChevronSVG from '@/assets/RightChevronSVG';
import { signupPolicy } from '@/constants/signupPolicy';

export default function ShowPolicyButton() {
  const [showPolicy, setShowPolicy] = useState(false);

  const handleOutsideClick = () => {
    setShowPolicy(false);
  };

  const handleInsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <button type="button" className="p-2" aria-label="show-detail" onClick={() => setShowPolicy(true)}>
        <RightChevronSVG width={12} height={12} />
      </button>
      {showPolicy && (
        <div
          className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30"
          onClick={handleOutsideClick}
          role="presentation"
        >
          <div
            className="flex h-1/2 min-h-96 w-1/3 min-w-72 flex-col items-center justify-center rounded-lg bg-white p-5"
            onClick={handleInsideClick}
            role="presentation"
          >
            <textarea className="h-full w-full resize-none p-2 focus:outline-none" defaultValue={signupPolicy} readOnly />
          </div>
        </div>
      )}
    </>
  );
}
