import Toc from 'react-toc';

export default function TOC({ markdownText }: { markdownText: string }) {
  return (
    <div className="mb-8 table border-[1.5px] border-base-200 p-2 dark:border-base-300">
      <p className="text-xl dark:text-base-300">목차</p>
      <Toc markdownText={markdownText} lowestHeadingLevel={3} className="TOC" />
    </div>
  );
}
