import { AxiosError } from 'axios';
import WikiEditContents from './WikiEditContents';

interface WikiEditErrorFallbackProps {
  error: AxiosError;
  resetErrorBoundary: () => void;
  pageTitle: string;
}

export default function WikiEditErrorFallback({ error, resetErrorBoundary, pageTitle }: WikiEditErrorFallbackProps) {
  if (error.response?.status === 404) return <WikiEditContents isEdit={false} pageTitle={pageTitle} prevContents="" />;

  return (
    <div>
      <p> 에러: {error.message} </p>
      <button type="button" onClick={() => resetErrorBoundary()}>
        다시 시도
      </button>
    </div>
  );
}
