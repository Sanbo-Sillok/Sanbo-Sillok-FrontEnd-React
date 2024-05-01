import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SkeletonLoading from '@/components/Wiki/SkeletonLoading';
import WikiEditFetcher from './WikiEditFetcher';
import WikiEditErrorFallback from './WikiEditErrorFallback';

export default function WikiEdit() {
  const { pageTitle } = useParams() as { pageTitle: string };
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>산보실록: {pageTitle} (편집)</title>
      </Helmet>
      <ErrorBoundary
        resetKeys={[pathname]}
        FallbackComponent={({ error, resetErrorBoundary }) => WikiEditErrorFallback({ error, resetErrorBoundary, pageTitle })}
      >
        <Suspense fallback={<SkeletonLoading />}>
          <WikiEditFetcher />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
