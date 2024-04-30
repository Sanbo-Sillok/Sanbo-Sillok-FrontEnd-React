import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SkeletonLoading from '@/components/Wiki/SkeletonLoading';
import useWikiQuery from '@/apis/queries/useWikiQuery';
import WikiEditContents from './WikiEditContents';

export default function Edit() {
  const { pageTitle } = useParams() as { pageTitle: string };

  const { data: prevWikiData, isLoading } = useWikiQuery(`/wiki/${pageTitle}`);

  if (isLoading) return <SkeletonLoading />;

  return (
    <>
      <Helmet>
        <title>
          산보실록: {pageTitle} {prevWikiData ? '(편집)' : '(새 페이지 생성)'}
        </title>
      </Helmet>
      <WikiEditContents isEdit={!!prevWikiData} pageTitle={pageTitle} prevContents={prevWikiData ? prevWikiData.result.contents : ''} />
    </>
  );
}
