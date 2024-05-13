import { useNavigate, useParams } from 'react-router-dom';
import useWikiSuspenseQuery from '@/apis/queries/useWikiSuspenseQuery';
import BackButton from '@/components/Edit/BackButton';
import EditTitle from '@/components/Edit/EditTitle';
import ImageUploadButton from '@/components/Edit/ImageUploadButton';
import SaveButton from '@/components/Edit/SaveButton';
import MarkdownToHTML from '@/components/MarkdownToHTML';
import useSyncScroll from '@/hooks/useSyncScroll';
import useEdit from '@/hooks/useEdit';

export default function WikiEditFetcher() {
  const { pageTitle } = useParams() as { pageTitle: string };
  const { data } = useWikiSuspenseQuery(pageTitle);
  const { handleInput, syncRef } = useSyncScroll<HTMLDivElement>();
  const navigate = useNavigate();

  const prevContents = data.content ?? '';
  const isEdit = data.isExist;

  if (data.status === 'PROTECTED' || data.status === 'REPORTED') {
    alert('해당 페이지는 수정할 수 없습니다.');
    navigate(-1);
  }

  const { contents, handleChangeContents, handleSave, onDropImage, handleUploadImage, isSaving, textareaRef } = useEdit({
    pageTitle,
    prevContents,
    isEdit,
  });

  return (
    <section className="flex h-full gap-4 bg-white p-5 dark:bg-base-800">
      <div className="flex h-full w-1/2 flex-col mobile:w-full">
        <EditTitle>{`${pageTitle} ${data.isExist ? '(편집)' : '(새 페이지 생성)'}`}</EditTitle>
        <div className="h-1 w-10 bg-base-700 dark:bg-base-600" />
        <form onSubmit={handleSave} className="flex h-full flex-col">
          <textarea
            onDrop={onDropImage}
            className="scroll-custom mb-1 mt-5 h-full resize-none bg-transparent pl-1 focus:outline-none dark:text-base-200"
            onChange={handleChangeContents}
            name="contents"
            ref={textareaRef}
            placeholder="이곳에 내용을 입력하세요"
            onKeyDown={handleInput}
            value={contents}
          />
          <div className="flex items-center justify-end gap-2 border-t border-base-500 p-3 dark:border-base-600">
            <ImageUploadButton handleUploadImage={handleUploadImage} />
            <BackButton />
            <SaveButton disabled={isSaving} />
          </div>
        </form>
      </div>
      <div
        className="scroll-custom my-2 h-auto w-1/2 overflow-auto border-l border-base-500 pl-4 pr-4 mobile:hidden dark:border-base-600"
        ref={syncRef}
      >
        <EditTitle>{pageTitle}</EditTitle>
        <div>
          <MarkdownToHTML>{contents}</MarkdownToHTML>
        </div>
      </div>
    </section>
  );
}
