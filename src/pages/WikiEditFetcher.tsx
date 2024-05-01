import { useParams } from 'react-router-dom';
import useWikiSuspenseQuery from '@/apis/queries/useWikiSuspenseQuery';
import WikiEditContents from './WikiEditContents';

export default function WikiEditFetcher() {
  const { pageTitle } = useParams() as { pageTitle: string };
  const { data: prevWikiData } = useWikiSuspenseQuery(`/wiki/${pageTitle}`);

  return <WikiEditContents isEdit pageTitle={pageTitle} prevContents={prevWikiData.result.contents} />;
}
