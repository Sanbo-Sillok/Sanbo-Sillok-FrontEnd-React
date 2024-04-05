import { Link, useParams } from 'react-router-dom';
import MarkdownToHTML from '@/components/MarkdownToHTML';
import TOC from '@/components/Wiki/TOC';
import { WikiData } from '@/types/wiki';
import { getLastUpdateTime } from '@/utils/getLastUpdateTime';
import { getLastUpdateUser } from '@/utils/getLastUpdateUser';
import SkeletonLoading from '@/components/Wiki/SkeletonLoading';
import useGetAxios from '@/hooks/useGetAxios';
import WikiNotFound from '@/components/Wiki/WikiNotFound';
import WikiPageTitle from '@/components/Wiki/WikiPageTitle';
import ScrollTop from '@/components/Wiki/ScrollTop';

export default function Wiki() {
  const { pageTitle } = useParams();
  const { data, isLoading } = useGetAxios<WikiData>(`/wiki/${pageTitle}`);

  if (isLoading) return <SkeletonLoading />;
  if (!data) return <WikiNotFound pageTitle={pageTitle as string} />;

  return (
    <div className="p-10 pb-20">
      <div className="flex items-end justify-between border-b border-base-200 pb-1">
        <WikiPageTitle>{decodeURI(data.result.title)}</WikiPageTitle>
        {data.result.status === 'ACTIVE' ? (
          <Link to={`/edit/${pageTitle}`} className="text-sm text-sanbo-blue">
            [편집]
          </Link>
        ) : null}
      </div>
      <div className="text-base">
        <p className="pt-1 text-right text-sm mobile:text-xs dark:text-base-300">
          최근 수정 시각: {getLastUpdateTime(data.result.updated_at)}
        </p>
        <p className="mb-4 pt-1 text-right text-sm mobile:text-xs dark:text-base-300">최근 수정 유저: {getLastUpdateUser(data.writer)}</p>
        <TOC markdownText={data.result.contents} />
        <MarkdownToHTML>{data.result.contents}</MarkdownToHTML>
      </div>
      <ScrollTop />
    </div>
  );
}
