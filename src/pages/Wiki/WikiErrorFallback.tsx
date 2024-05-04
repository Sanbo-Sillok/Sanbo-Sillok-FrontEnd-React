import { FallbackProps } from 'react-error-boundary';

export default function WikiErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  console.log('걸림');
  return (
    <div>
      <p> 에러: {error.message} </p>
      <button type="button" onClick={() => resetErrorBoundary()}>
        다시 시도
      </button>
    </div>
  );
}
