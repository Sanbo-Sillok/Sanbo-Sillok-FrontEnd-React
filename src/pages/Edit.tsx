import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageSVG from '@/assets/ImageSVG';
import MarkdownToHTML from '@/components/MarkdownToHTML';
import SkeletonLoading from '@/components/SkeletonLoading';
import useGetAxios from '@/hooks/useGetAxios';
import { WikiData } from '@/types/wiki';

export default function Edit() {
  const { pageTitle } = useParams();
  const { data, isLoading } = useGetAxios<WikiData>(`/wiki/${pageTitle}`);
  const [contents, setContents] = useState('');

  useEffect(() => {
    if (data) {
      const prevContents = data.result.contents;
      console.log(prevContents);
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
        <input
          className="mb-4 h-16 bg-white p-1 text-3xl focus:outline-none dark:bg-base-700 dark:text-base-200"
          type="text"
          value={data ? data.result.title : `${pageTitle} (새 페이지 생성)`}
          disabled
        />
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
            <input hidden type="file" accept="image/jpg, image/jpeg, image/png" className="hidden" ref={() => {}} onChange={() => {}} />
            <button
              type="button"
              aria-label="submit-button"
              onClick={() => {}}
              className="mr-5 cursor-pointer rounded-full p-2.5 duration-300 hover:bg-base-300 dark:hover:bg-zinc-600"
            >
              <ImageSVG />
            </button>
            <button type="button" className="rounded-lg bg-base-200 px-4 py-2 duration-300 hover:bg-base-300" disabled={isLoading}>
              {isLoading ? 'Loading' : 'Save'}
            </button>
          </div>
        </form>
      </div>
      <div className="h-auto w-[1px] border-[1px] mobile:hidden" />
      <div className="mt-2 h-full w-1/2 overflow-auto pl-4 pr-4 mobile:hidden" ref={() => {}}>
        <div>
          <h1 className="pb-6 text-4xl font-semibold dark:text-base-200">{pageTitle}</h1>
        </div>
        <div>
          <MarkdownToHTML>{contents}</MarkdownToHTML>
        </div>
      </div>
    </section>
  );
}
