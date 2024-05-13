import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthAxiosInstance from './useAuthAxiosInstance';
import { WikiPatchBody, WikiPostBody } from '@/types/apis/wiki';
import { ExistWikiData } from '@/types/wiki';

export default function useSaveWiki() {
  const authAxios = useAuthAxiosInstance();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const saveWiki = async ({ isEdit, pageTitle, contents }: { isEdit: boolean; pageTitle: string; contents: string }) => {
    setIsLoading(true);

    try {
      // TODO: 엔드포인트 수정
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

      const response = await authAxios<ExistWikiData>({ method, url, data });

      if (response.data.status === 200) navigate(-1);
    } catch (err) {
      alert('잠시후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, saveWiki };
}
