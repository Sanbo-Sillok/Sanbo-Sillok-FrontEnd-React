import { useRef } from 'react';
import useSignupImage from '@/hooks/SignupForm/useSignupImage';

export default function SignupImageUploadButton() {
  const imageUploaderRef = useRef<HTMLInputElement>(null);

  const { uploadImage, upload } = useSignupImage();

  const onCickImageUpload = () => {
    if (imageUploaderRef.current) imageUploaderRef.current.click();
  };

  return (
    <>
      <input hidden type="file" ref={imageUploaderRef} accept="image/jpg, image/jpeg, image/png" onChange={upload} className="hidden" />
      <button type="button" onClick={onCickImageUpload} className="flex h-10 w-full items-center justify-center rounded bg-base-200 p-2">
        {uploadImage ? '업로드 완료' : '학과 인증 이미지 업로드'}
      </button>
    </>
  );
}
