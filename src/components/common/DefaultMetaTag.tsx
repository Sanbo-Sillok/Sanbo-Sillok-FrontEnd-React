import { Helmet } from 'react-helmet-async';
import IOSMetaTag from './IOSMetaTag';

export default function DefaultMetaTag() {
  return (
    <>
      <Helmet>
        <title>산보실록</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content="산보실록" />
        <meta property="og:site_name" content="산보실록" />
        <meta property="og:description" content="산보실록 - 함께 만들어가는 페이지" />
        {/* FIXME: 배포 경로로 수정 */}
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />

        <link rel="manifest" href="manifest.json" />

        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F4F5" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#27272A" />
      </Helmet>
      <IOSMetaTag />
    </>
  );
}
