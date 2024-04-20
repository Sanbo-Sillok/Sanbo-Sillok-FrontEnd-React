import { useRef } from 'react';

export default function useSyncScroll<S extends HTMLElement>() {
  const syncRef = useRef<S>(null);

  const handleInput = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!syncRef.current) return;

    const contentsLength = event.currentTarget.value.length;
    const currentCursor = event.currentTarget.selectionEnd;

    if (contentsLength === currentCursor) syncRef.current.scrollTop = syncRef.current.scrollHeight;
  };

  return { handleInput, syncRef };
}
