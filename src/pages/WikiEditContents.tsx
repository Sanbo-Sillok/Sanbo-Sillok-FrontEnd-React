import { useRef, useState } from 'react';
import useImageMutation from '@/apis/mutations/useImageMutation';
import useWikiMutation from '@/apis/mutations/useWikiMutation';
import BackButton from '@/components/Edit/BackButton';
import EditTitle from '@/components/Edit/EditTitle';
import ImageUploadButton from '@/components/Edit/ImageUploadButton';
import SaveButton from '@/components/Edit/SaveButton';
import MarkdownToHTML from '@/components/MarkdownToHTML';
import useSyncScroll from '@/hooks/useSyncScroll';

interface WikiEditContentsProps {
  isEdit: boolean;
  pageTitle: string;
  prevContents: string;
}

export default function WIkiEditContents({ pageTitle, isEdit, prevContents }: WikiEditContentsProps) {
  const [contents, setContents] = useState(prevContents.slice(0, prevContents.length - 2));
  const { mutate: saveWiki, isPending: isSaving } = useWikiMutation();
  const { mutateAsync: uploadImageToServer } = useImageMutation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { handleInput, syncRef } = useSyncScroll<HTMLDivElement>();

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
      isEdit,
      pageTitle: pageTitle as string,
      contents,
    };

    saveWiki(saveWikiData);
  };

  return (
    <section className="flex h-full gap-4 bg-white p-5 dark:bg-base-800">
      <div className="flex h-full w-1/2 flex-col mobile:w-full">
        <EditTitle>{`${pageTitle} ${isEdit ? '(편집)' : '(새 페이지 생성)'}`}</EditTitle>
        <div className="h-1 w-10 bg-base-700 dark:bg-base-600" />
        <form onSubmit={handleSave} className="flex h-full flex-col">
          <textarea
            onDrop={onDropImage}
            className="scroll-custom mb-1 mt-5 h-full resize-none bg-transparent pl-1 focus:outline-none dark:text-base-200"
            onChange={(event) => setContents(event.target.value)}
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
