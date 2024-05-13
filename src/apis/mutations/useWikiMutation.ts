import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { WikiPatchBody, WikiPostBody } from '@/types/api';
import { ExistWikiData } from '@/types/wiki';
import { REACT_QUERY_KEYS } from '@/constants/queryKey';

export default function useWikiMutation() {
  const authAxios = useAuthAxiosInstance();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const save = async ({ isEdit, pageTitle, contents }: { isEdit: boolean; pageTitle: string; contents: string }) => {
    const url = isEdit ? `/post/${pageTitle}` : '/post';
    const method = isEdit ? 'PATCH' : 'POST';
    const newContents = `${contents}\n\n`;

    const data = isEdit
      ? ({
          content: newContents,
        } as WikiPatchBody)
      : ({
          title: pageTitle,
          content: newContents,
        } as WikiPostBody);

    await authAxios<ExistWikiData>({ method, url, data });

    return pageTitle;
  };

  const onSuccess = (pageTitle: string) => {
    queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.WIKI_DETAIL, pageTitle] });
    navigate(`/wiki/${pageTitle}`);
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
