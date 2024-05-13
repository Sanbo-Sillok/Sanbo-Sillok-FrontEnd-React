import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SkeletonLoading from '@/components/Wiki/SkeletonLoading';
import WikiEditFetcher from './WikiEditFetcher';
import ServerError from '../ServerError';

export default function WikiEdit() {
  const { pageTitle } = useParams() as { pageTitle: string };

  return (
    <>
      <Helmet>
        <title>산보실록: {pageTitle} (편집)</title>
      </Helmet>
      <ErrorBoundary resetKeys={[useLocation().pathname]} FallbackComponent={ServerError}>
        <Suspense fallback={<SkeletonLoading />}>
          <WikiEditFetcher />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
