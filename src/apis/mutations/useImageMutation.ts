import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { ImageUploadResponse } from '@/types/apis/wiki';

export default function useImageMutation() {
  const authAxios = useAuthAxiosInstance();

  const uploadImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    // TODO: 엔드포인트 수정
    const response = await authAxios.post<ImageUploadResponse>('/post/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const { imagePath } = response.data;

    return imagePath;
  };

  // TODO: Error 타입 변경
  const onError = (err: AxiosError) => {
    console.log(err);
    alert('이미지 업로드에 실패했습니다. 잠시후 다시 시도해주세요');
  };

  return useMutation({
    mutationFn: uploadImage,
    onError,
  });
}
