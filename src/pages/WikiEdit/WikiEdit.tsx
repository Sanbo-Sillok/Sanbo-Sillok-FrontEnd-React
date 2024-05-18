import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SkeletonLoading from '@/components/Wiki/SkeletonLoading';
import WikiEditContents from './WikiEditContents';

export default function WikiEdit() {
  const { pageTitle } = useParams() as { pageTitle: string };

  return (
    <>
      <Helmet>
        <title>산보실록: {pageTitle} (편집)</title>
      </Helmet>
      <Suspense fallback={<SkeletonLoading />}>
        <WikiEditContents />
      </Suspense>
    </>
  );
}
