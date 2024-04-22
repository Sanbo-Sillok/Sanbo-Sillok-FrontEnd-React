import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WikiPageTitle from './WikiPageTitle';

interface WikiNotFoundProps {
  pageTitle: string;
}

export default function WikiNotFound({ pageTitle }: WikiNotFoundProps) {
  return (
    <>
      <Helmet>
        <title>산보실록: {pageTitle}</title>
      </Helmet>
      <div className="p-10">
        <WikiPageTitle>{pageTitle}</WikiPageTitle>
        <p className="mt-6 dark:text-base-200">페이지가 존재하지 않습니다.</p>
        <br />
        <Link to={`/edit/${pageTitle}`} className="text-sanbo-blue">
          [페이지 생성하기]
        </Link>
      </div>
    </>
  );
}
