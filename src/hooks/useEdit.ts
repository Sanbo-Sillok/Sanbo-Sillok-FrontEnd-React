import { useRef, useState } from 'react';
import useImageMutation from '@/apis/mutations/useImageMutation';
import useWikiMutation from '@/apis/mutations/useWikiMutation';

export default function useEdit({ prevContents, pageTitle, isEdit }: { prevContents: string; pageTitle: string; isEdit: boolean }) {
  const [contents, setContents] = useState(prevContents.slice(0, prevContents.length - 2));
  const { mutate: saveWiki, isPending: isSaving } = useWikiMutation();
  const { mutateAsync: uploadImageToServer } = useImageMutation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

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

  return { contents, handleChangeContents, handleSave, onDropImage, handleUploadImage, isSaving, textareaRef };
}
