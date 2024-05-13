import { Link } from 'react-router-dom';
import WikiPageTitle from '@/components/Wiki/WikiPageTitle';
import { getLastUpdateTime } from '@/utils/getLastUpdateTime';
import { getLastUpdateUser } from '@/utils/getLastUpdateUser';
import TOC from '@/components/Wiki/TOC';
import MarkdownToHTML from '@/components/MarkdownToHTML';
import ScrollTop from '@/components/Wiki/ScrollTop';
import WikiNotFound from '@/components/Wiki/WikiNotFound';
import useWikiQuery from '@/apis/queries/useWikiQuery';
import SkeletonLoading from '@/components/Wiki/SkeletonLoading';

interface WikiContentsProps {
  pageTitle: string;
}

export default function WikiContents({ pageTitle }: WikiContentsProps) {
  // TODO: 엔드포인트 수정
  const { data, isLoading } = useWikiQuery(`/post/${pageTitle}`);

  // FIXME: 추후 백엔드 변경에 맞춰 선언형으로 변경 (에러 바운더리 사용)
  if (isLoading) return <SkeletonLoading />;
  if (!data?.isExist) return <WikiNotFound pageTitle={pageTitle} />;

  return (
    <div className="p-10 pb-20">
      <div className="flex items-end justify-between border-b border-base-200 pb-1">
        <WikiPageTitle>{decodeURI(data.title)}</WikiPageTitle>
        {data.status === 'ACTIVE' && (
          <Link to={`/edit/${pageTitle}`} className="text-sm text-sanbo-blue">
            [편집]
          </Link>
        )}
      </div>
      <div className="text-base">
        <p className="pt-1 text-right text-sm mobile:text-xs dark:text-base-300">최근 수정 시각: {getLastUpdateTime(data.updatedAt)}</p>
        <p className="mb-4 pt-1 text-right text-sm mobile:text-xs dark:text-base-300">
          최근 수정 유저: {getLastUpdateUser(data.lastModifier)}
        </p>
        <TOC markdownText={data.contents} />
        <MarkdownToHTML>{data.contents}</MarkdownToHTML>
      </div>
      <ScrollTop />
    </div>
  );
}
