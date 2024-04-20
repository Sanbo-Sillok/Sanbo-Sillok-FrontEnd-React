import { useMutation } from '@tanstack/react-query';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { ImageUploadResponse } from '@/types/api';

export default function useImageMutation() {
  const authAxios = useAuthAxiosInstance();

  const uploadImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await authAxios.post<ImageUploadResponse>('/wiki/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // TODO: 서버 API 응답 바뀜에 따라 로직 수정
    const { status, result } = response.data;

    if (status === 400) throw new Error('upload fail');

    return result.image;
  };

  // TODO: Error 타입 변경
  const onError = (err: Error) => {
    if (err.message === 'upload fail') console.log(err.message);
  };

  return useMutation({
    mutationFn: uploadImage,
    onError,
  });
}
