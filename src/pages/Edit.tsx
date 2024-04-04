import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownToHTML from '@/components/MarkdownToHTML';
import SkeletonLoading from '@/components/Wiki/SkeletonLoading';
import useGetAxios from '@/hooks/useGetAxios';
import { WikiData } from '@/types/wiki';
import EditTitle from '@/components/Edit/EditTitle';
import ImageUploadButton from '@/components/Edit/ImageUploadButton';
import SaveButton from '@/components/Edit/SaveButton';
import useAuthAxiosInstance from '@/hooks/useAuthAxiosInstance';
import { WikiPatchBody, WikiPostBody } from '@/types/api';

export default function Edit() {
  const { pageTitle } = useParams();

  const navigate = useNavigate();
  const authAxios = useAuthAxiosInstance();

  const { data: prevWikiData, isLoading } = useGetAxios<WikiData>(`/wiki/${pageTitle}`);

  const [contents, setContents] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (prevWikiData) {
      const prevContents = prevWikiData.result.contents;
      setContents(prevContents.slice(0, prevContents.length - 2));
    }
  }, [prevWikiData]);

  if (isLoading) return <SkeletonLoading />;

  const handleChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  // TODO: 로직 추가
  const onDropImage = () => {};

  // TODO: 로직 추가
  const handleUploadImage = () => {};

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsSaving(true);
    event.preventDefault();

    // FIXME: PATCH 안됨
    const url = prevWikiData ? `/wiki/${pageTitle}` : '/wiki/';
    const method = prevWikiData ? 'PATCH' : 'POST';
    const newContents = `${contents}\n\n`;
    const data = prevWikiData
      ? ({
          contents: newContents,
        } as WikiPatchBody)
      : ({
          title: pageTitle as string,
          contents: newContents,
        } as WikiPostBody);

    const response = await authAxios({ method, url, data });

    if (response.data.status === 200) navigate(`/wiki/${pageTitle}`);
    setIsSaving(false);
  };

  return (
    <section className="flex h-full bg-white p-5 dark:bg-base-800">
      <div className="flex h-full w-1/2 flex-col pr-4 mobile:w-full">
        <EditTitle>{`${pageTitle} ${prevWikiData ? '' : '(새 페이지 생성)'}`}</EditTitle>
        <div className="h-1 w-10 bg-base-700 dark:bg-base-600" />
        <form onSubmit={handleSave} className="flex h-full flex-col">
          <textarea
            onDrop={onDropImage}
            className="mb-1 mt-5 h-full resize-none bg-transparent pl-1 focus:outline-none dark:text-base-200"
            onChange={handleChangeContents}
            name="contents"
            placeholder="이곳에 내용을 입력하세요"
            ref={() => {}}
            onScroll={() => {}}
            value={contents}
          />
          <div className="flex items-center justify-end border-t border-base-500 p-3 dark:border-base-600">
            <ImageUploadButton handleUploadImage={handleUploadImage} />
            <SaveButton disabled={isSaving} />
          </div>
        </form>
      </div>
      <div className="h-auto w-[1px] border-[1px] mobile:hidden" />
      <div className="mt-2 h-full w-1/2 overflow-auto pl-4 pr-4 mobile:hidden" ref={() => {}}>
        <EditTitle>{pageTitle}</EditTitle>
        <div>
          <MarkdownToHTML>{contents}</MarkdownToHTML>
        </div>
      </div>
    </section>
  );
}
