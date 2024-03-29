import { Link, useParams } from 'react-router-dom';
import MarkdownToHTML from '@/components/MarkdownToHTML';
import TOC from '@/components/TOC';
import { WikiData } from '@/types/wiki';
import { getLastUpdateTime } from '@/utils/getLastUpdateTime';
import { getLastUpdateUser } from '@/utils/getLastUpdateUser';
import SkeletonLoading from '@/components/SkeletonLoading';
import useGetAxios from '@/hooks/useGetAxios';

export default function Wiki() {
  const { pageTitle } = useParams();
  const { data, isLoading } = useGetAxios<WikiData>(`/wiki/${pageTitle}`);

  if (isLoading) return <SkeletonLoading />;

  if (!data)
    return (
      <>
        <p className="mt-6 dark:text-zinc-300">페이지가 존재하지 않습니다.</p>
        <br />
        <Link to={`edit/${pageTitle}`} className="text-sanbo-blue">
          [페이지 생성하기]
        </Link>
      </>
    );

  return (
    <div className="p-10">
      <div className="flex items-end justify-between border-b pb-1">
        <h1 className="pb-6 text-4xl font-semibold dark:text-zinc-300">{decodeURI(data.result.title)}</h1>
        {data.result.status === 'ACTIVE' ? (
          <Link to={`edit/${pageTitle}`} className="text-sm text-sanbo-blue">
            [편집]
          </Link>
        ) : null}
      </div>
      <div className="text-base">
        <p className="pt-1 text-right text-sm mobile:text-xs dark:text-zinc-300">
          최근 수정 시각: {getLastUpdateTime(data.result.updated_at)}
        </p>
        <p className="mb-4 pt-1 text-right text-sm mobile:text-xs dark:text-zinc-300">최근 수정 유저: {getLastUpdateUser(data.writer)}</p>
        <TOC markdownText={data.result.contents} />
        <MarkdownToHTML>{data.result.contents}</MarkdownToHTML>
      </div>
    </div>
  );
}
