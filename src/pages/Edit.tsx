import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownToHTML from '@/components/MarkdownToHTML';
import SkeletonLoading from '@/components/SkeletonLoading';
import useGetAxios from '@/hooks/useGetAxios';
import { WikiData } from '@/types/wiki';
import EditTitle from '@/components/EditTitle';
import ImageUploadButton from '@/components/ImageUploadButton';
import SaveButton from '@/components/SaveButton';

export default function Edit() {
  const { pageTitle } = useParams();
  const { data, isLoading } = useGetAxios<WikiData>(`/wiki/${pageTitle}`);
  const [contents, setContents] = useState('');

  useEffect(() => {
    if (data) {
      const prevContents = data.result.contents;
      setContents(prevContents.slice(0, prevContents.length - 2));
    }
  }, [data]);

  if (isLoading) return <SkeletonLoading />;

  const handleChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  return (
    <section className="flex h-full bg-white p-5">
      <div className="flex h-full w-1/2 flex-col pr-4 mobile:w-full">
        <EditTitle>{`${pageTitle} ${data ? '' : '(새 페이지 생성)'}`}</EditTitle>
        <div className="h-1 w-10 bg-base-700 dark:bg-zinc-600" />
        <form onSubmit={() => {}} className="flex h-full flex-col">
          <textarea
            onDrop={() => {}}
            className="mb-1 mt-5 h-full resize-none pl-1 focus:outline-none dark:bg-base-700 dark:text-base-200"
            onChange={handleChangeContents}
            name="contents"
            placeholder="이곳에 내용을 입력하세요"
            ref={() => {}}
            onScroll={() => {}}
            value={contents}
          />
          <div className="flex items-center justify-end border-t p-3">
            <ImageUploadButton handleUploadImage={() => alert('이미지 올림')} />
            <SaveButton isLoading={isLoading} />
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
