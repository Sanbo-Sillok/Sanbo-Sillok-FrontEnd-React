import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuthAxios from '../hooks/useAuthAxios';
import { WikiData } from '../types/wiki';
import MarkdownToHTML from '../components/MarkdownToHTML';
import { getLastUpdateTime } from '../utils/getLastUpdateTime';
import getLastUpdateUser from '../utils/getLastUpdateUser';

export default function Wiki() {
  const { pageTitle } = useParams();
  const [wikiData, setWikiData] = useState<WikiData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const authAxios = useAuthAxios();

  async function fetchWikiData() {
    setIsLoading(true);
    const response = await authAxios.get<WikiData>(`/wiki/${pageTitle}`);
    const { data, status } = response;

    if (status === 200) setWikiData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchWikiData();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  if (!wikiData)
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
        <h1 className="pb-6 text-4xl font-semibold dark:text-zinc-300">{decodeURI(wikiData.result.title)}</h1>
        {wikiData.result.status === 'ACTIVE' ? (
          <Link to={`edit/${pageTitle}`} className="text-sm text-sanbo-blue">
            [편집]
          </Link>
        ) : null}
      </div>
      <div className="text-base">
        <p className="pt-1 text-right text-sm mobile:text-xs dark:text-zinc-300">
          최근 수정 시각: {getLastUpdateTime(wikiData.result.updated_at)}
        </p>
        <p className="mb-4 pt-1 text-right text-sm mobile:text-xs dark:text-zinc-300">
          최근 수정 유저: {getLastUpdateUser(wikiData.writer)}
        </p>
        {/* <TOC markdownText={wikiData.result?.contents} /> */}
        <MarkdownToHTML>{wikiData.result.contents}</MarkdownToHTML>
      </div>
    </div>
  );
}
