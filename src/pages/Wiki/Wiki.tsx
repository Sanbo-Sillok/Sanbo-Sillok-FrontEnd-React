import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SkeletonLoading from '@/components/Wiki/SkeletonLoading';
import WikiContents from './WikiContents';

export default function Wiki() {
  const { pageTitle } = useParams() as { pageTitle: string };

  return (
    <>
      <Helmet>
        <title>산보실록: {pageTitle}</title>
      </Helmet>
      <Suspense fallback={<SkeletonLoading />}>
        <WikiContents pageTitle={pageTitle} />
      </Suspense>
    </>
  );
}
