import useSignupFormStore from '@/stores/signupFormStore';

export default function useSignupImage() {
  const uploadImage = useSignupFormStore((state) => state.uploadImage);
  const setUploadImage = useSignupFormStore((state) => state.setUploadImage);

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventTarget = event.target;

    if (eventTarget.files) setUploadImage(eventTarget.files[0]);
  };

  return { uploadImage, setUploadImage, upload };
}
