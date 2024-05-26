import { useMutation } from '@tanstack/react-query';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { ImageUploadResponse } from '@/types/apis/wiki';

export default function useImageMutation() {
  const authAxios = useAuthAxiosInstance();

  const uploadImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await authAxios.post<ImageUploadResponse>('/post/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const { imagePath } = response.data; // {name}.{extension}

    return `${import.meta.env.VITE_API_DOMAIN}/image/${imagePath}`;
  };

  const onError = () => {
    alert('이미지 업로드에 실패했습니다. 잠시후 다시 시도해주세요');
  };

  return useMutation({
    mutationFn: uploadImage,
    onError,
  });
}
