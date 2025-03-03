import { AxiosError } from 'axios';
import { FallbackProps } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';
import { SERVER_AUTH_ERROR_STATUS_CODE } from '@/constants/serverStatusCode';

interface ServerErrorProps extends FallbackProps {
  error: AxiosError;
}

export default function ServerError({ error, resetErrorBoundary }: ServerErrorProps) {
  if (error.response?.status === SERVER_AUTH_ERROR_STATUS_CODE) {
    window.location.reload();
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex items-center justify-center p-10">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-3xl dark:text-base-200">문제가 발생했습니다!</h1>
        <button
          type="button"
          className="rounded-lg bg-base-200 px-4 py-2 duration-300 hover:bg-base-300"
          onClick={() => resetErrorBoundary()}
        >
          다시시도
        </button>
      </div>
    </div>
  );
}
