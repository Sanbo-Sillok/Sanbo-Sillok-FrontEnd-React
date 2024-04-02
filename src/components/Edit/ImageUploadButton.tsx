import { useRef } from 'react';
import ImageSVG from '@/assets/ImageSVG';

interface ImageUploadButtonProps {
  handleUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUploadButton({ handleUploadImage }: ImageUploadButtonProps) {
  const imageUploaderRef = useRef<HTMLInputElement>(null);

  const onCickImageUpload = () => {
    if (imageUploaderRef.current) imageUploaderRef.current.click();
  };

  return (
    <>
      <input
        hidden
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        className="hidden"
        ref={imageUploaderRef}
        onChange={handleUploadImage}
      />
      <button
        type="button"
        aria-label="submit-button"
        onClick={onCickImageUpload}
        className="mr-5 cursor-pointer rounded-full p-2.5 duration-300 hover:bg-base-300 dark:hover:bg-base-600"
      >
        <ImageSVG />
      </button>
    </>
  );
}
