import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAllTitleQuery } from '@/apis/queries/useAllTitleQuery';

export default function AllTitle() {
  const { data: allTitles } = useAllTitleQuery();

  return (
    <>
      <Helmet>
        <title>산보실록: 모든 페이지</title>
      </Helmet>
      <div className="p-10 pb-20">
        <ul className="grid w-full grid-cols-3 gap-2 mobile:grid-cols-2">
          {allTitles?.map((titleInfo) => (
            <Link to={`/wiki/${titleInfo.title}`} key={titleInfo.title} className="cursor-pointer text-sanbo-blue">
              {titleInfo.title}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
