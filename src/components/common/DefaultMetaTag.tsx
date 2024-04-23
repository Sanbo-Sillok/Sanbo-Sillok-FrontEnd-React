import { Helmet } from 'react-helmet-async';

export default function DefaultMetaTag() {
  return (
    <Helmet>
      <title>산보실록</title>

      <meta property="og:type" content="website" />
      <meta property="og:title" content="산보실록" />
      <meta property="og:site_name" content="산보실록" />
      <meta property="og:description" content="산보실록 - 함께 만들어가는 페이지" />
      {/* FIXME: 배포 경로로 수정 */}
      <meta property="og:image" content="" />
      <meta property="og:url" content="" />
    </Helmet>
  );
}
