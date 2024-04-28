import { AxiosError } from 'axios';
import WikiNotFound from '@/components/Wiki/WikiNotFound';

interface WikiErrorFallbackProps {
  error: AxiosError;
  resetErrorBoundary: () => void;
  pageTitle: string;
}

export default function WikiErrorFallback({ error, resetErrorBoundary, pageTitle }: WikiErrorFallbackProps) {
  if (error.response?.status === 404) return <WikiNotFound pageTitle={pageTitle} />;

  return (
    <div>
      <p> 에러: {error.message} </p>
      <button type="button" onClick={() => resetErrorBoundary()}>
        다시 시도
      </button>
    </div>
  );
}
