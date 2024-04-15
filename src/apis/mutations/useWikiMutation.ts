import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { WikiPatchBody, WikiPostBody } from '@/types/api';
import { WikiData } from '@/types/wiki';

export default function useWikiMutation() {
  const authAxios = useAuthAxiosInstance();
  const navigate = useNavigate();

  const save = async ({ isEdit, pageTitle, contents }: { isEdit: boolean; pageTitle: string; contents: string }) => {
    const url = isEdit ? `/wiki/${pageTitle}` : '/wiki/';
    const method = isEdit ? 'PATCH' : 'POST';
    const newContents = `${contents}\n\n`;

    const data = isEdit
      ? ({
          contents: newContents,
        } as WikiPatchBody)
      : ({
          title: pageTitle as string,
          contents: newContents,
        } as WikiPostBody);

    // TODO: 쿼리키를 이용한 캐시
    const response = await authAxios<WikiData>({ method, url, data });

    return response;
  };

  const onSuccess = () => {
    navigate(-1);
  };

  const onError = () => {
    alert('잠시후 다시 시도해주세요.');
  };

  return useMutation({
    mutationFn: save,
    onSuccess,
    onError,
  });
}
