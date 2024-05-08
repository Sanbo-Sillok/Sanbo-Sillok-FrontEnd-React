import { FallbackProps } from 'react-error-boundary';

export default function WikiErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <p> 에러: {error.message} </p>
      <button type="button" onClick={() => resetErrorBoundary()}>
        다시 시도
      </button>
    </div>
  );
}
