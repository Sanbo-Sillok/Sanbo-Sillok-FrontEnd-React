import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import ServerError from '../ServerError';

export default function LayoutWithoutNav() {
  return (
    <section className="w-sreen h-screen bg-base-100 dark:bg-base-800">
      <ErrorBoundary
        resetKeys={[useLocation().pathname]}
        FallbackComponent={ServerError}
        onError={() => console.log('에러 바운더리 초기화')}
      >
        <Outlet />
      </ErrorBoundary>
    </section>
  );
}
