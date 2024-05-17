import { Link } from 'react-router-dom';
import WikiPageTitle from './WikiPageTitle/WikiPageTitle';

interface WikiNotFoundProps {
  pageTitle: string;
}

export default function WikiNotFound({ pageTitle }: WikiNotFoundProps) {
  return (
    <div className="p-10">
      <WikiPageTitle>{pageTitle}</WikiPageTitle>
      <p className="mt-6 dark:text-base-200">페이지가 존재하지 않습니다.</p>
      <br />
      <Link to={`/edit/${pageTitle}`} className="text-sanbo-blue">
        [페이지 생성하기]
      </Link>
    </div>
  );
}
