import { Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import SkeletonLoading from '@/components/Wiki/SkeletonLoading';
import WikiContents from './WikiContents';
import WikiErrorFallback from './WikiErrorFallback';

export default function Wiki() {
  const { pageTitle } = useParams() as { pageTitle: string };
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>산보실록: {pageTitle}</title>
      </Helmet>
      <ErrorBoundary
        resetKeys={[pathname]}
        FallbackComponent={({ error, resetErrorBoundary }) => WikiErrorFallback({ error, resetErrorBoundary, pageTitle })}
      >
        <Suspense fallback={<SkeletonLoading />}>
          <WikiContents pageTitle={pageTitle} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
