import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MarkdownToHTML from '@/components/MarkdownToHTML';
import SkeletonLoading from '@/components/Wiki/SkeletonLoading';
import EditTitle from '@/components/Edit/EditTitle';
import ImageUploadButton from '@/components/Edit/ImageUploadButton';
import SaveButton from '@/components/Edit/SaveButton';
import BackButton from '@/components/Edit/BackButton';
import useWikiQuery from '@/apis/queries/useWikiQuery';
import useWikiMutation from '@/apis/mutations/useWikiMutation';
import { MAIN_PAGE_URL } from '@/constants/common';
import useSyncScroll from '@/hooks/useSyncScroll';
import useImageMutation from '@/apis/mutations/useImageMutation';

export default function Edit() {
  const { pageTitle } = useParams();
  const navigate = useNavigate();

  const { data: prevWikiData, isLoading } = useWikiQuery(`/wiki/${pageTitle}`);
  const { mutate: saveWiki, isPending: isSaving } = useWikiMutation();
  const { mutateAsync: uploadImageToServer } = useImageMutation();
  const { handleInput, syncRef } = useSyncScroll<HTMLDivElement>();

  const [contents, setContents] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (prevWikiData) {
      if (prevWikiData.result.status === 'PROTECTED') navigate(MAIN_PAGE_URL);

      const prevContents = prevWikiData.result.contents;
      setContents(prevContents.slice(0, prevContents.length - 2));
    }
  }, [prevWikiData]);

  if (isLoading) return <SkeletonLoading />;

  const handleChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  // FIXME: blob 객체 주소가 src로 안들어감
  const uploadImage = async (imageFile: File) => {
    if (!imageFile.type.startsWith('image')) return;
    if (!textareaRef.current) return;

    const { selectionStart: cursorPosition, value: currentValue } = textareaRef.current;

    const localImageURL = URL.createObjectURL(imageFile);
    const markdownImageUploading = `![Uploading...](${localImageURL})`;

    const uploadingContents = `${currentValue.substring(0, cursorPosition)}${markdownImageUploading}${currentValue.substring(cursorPosition)}`;
    textareaRef.current.value = uploadingContents;
    setContents(uploadingContents);

    const imageURL = await uploadImageToServer(imageFile);
    const markdownImageUploaded = `![](${imageURL})`;

    textareaRef.current.value = textareaRef.current.value.replace(markdownImageUploading, markdownImageUploaded);
    setContents(textareaRef.current.value);

    URL.revokeObjectURL(localImageURL);
  };

  const onDropImage = async (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const image = event.dataTransfer.files[0];
    uploadImage(image);
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventTarget = event.target;

    if (eventTarget.files) {
      uploadImage(eventTarget.files[0]);
      eventTarget.value = '';
    }
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const saveWikiData = {
      isEdit: !!prevWikiData,
      pageTitle: pageTitle as string,
      contents,
    };

    saveWiki(saveWikiData);
  };

  return (
    <>
      <Helmet>
        <title>
          산보실록: {pageTitle} {prevWikiData ? '(편집)' : '(새 페이지 생성)'}
        </title>
      </Helmet>
      <section className="flex h-full gap-4 bg-white p-5 dark:bg-base-800">
        <div className="flex h-full w-1/2 flex-col mobile:w-full">
          <EditTitle>{`${pageTitle} ${prevWikiData ? '(편집)' : '(새 페이지 생성)'}`}</EditTitle>
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
    </>
  );
}
