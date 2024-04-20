/* eslint-disable */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Link } from 'react-router-dom';

const urlTransform = (url: string) => {
  if (url.startsWith(import.meta.env.VITE_IMAGE_SERVER_URL) || url.startsWith(`blob:${import.meta.env.VITE_CLIENT_BASE_URL}`)) return url;
  return null;
};

export default function MarkdownToHTML({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      urlTransform={urlTransform}
      components={{
        h1: ({ node, children, ...props }) => (
          <h1
            className="mb-2 mt-14 border-b border-base-200 pb-2 text-3xl font-semibold dark:text-base-200"
            id={String(children).replaceAll(' ', '-').toLowerCase()}
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ node, children, ...props }) => (
          <h2
            className="mb-2 mt-7 border-b border-base-200 pb-2 text-2xl font-semibold dark:text-base-200"
            id={String(children).replaceAll(' ', '-').toLowerCase()}
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3
            className="mb-2 mt-7 border-b border-base-200 pb-2 text-xl font-semibold dark:text-base-200"
            id={String(children).replaceAll(' ', '-').toLowerCase()}
            {...props}
          >
            {children}
          </h3>
        ),
        a: ({ node, children, ...props }) => (
          <Link to={props.href || ''} className="text-sanbo-blue" {...props}>
            {children}
          </Link>
        ),
        p: ({ node, ...props }) => <p className="mb-5 mt-1 dark:text-base-200" {...props} />,
        li: ({ node, ...props }) => <li className="mb-2 mt-2 dark:text-base-200 [&>p]:mb-1" {...props} />,
        ul: ({ node, ...props }) => <ul className="mb-1 ml-5 mt-1 list-disc dark:text-base-200" {...props} />,
        ol: ({ node, ...props }) => <ol className="mb-1 ml-5 mt-1 list-decimal dark:text-base-200" {...props} />,
        pre: ({ node, ...props }) => (
          <pre
            className="scroll-custom block w-full overflow-auto rounded-lg bg-base-200 p-8 text-sm dark:bg-base-600 dark:text-base-200"
            {...props}
          />
        ),
        code: ({ node, ...props }) => (
          <code className="rounded bg-base-200 p-1 pb-0.5 pt-0.5 text-sm dark:bg-base-600 dark:text-base-200" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="border border-base-950 p-1 pl-3 pr-3 dark:border-base-200 dark:text-base-200" {...props} />
        ),
        td: ({ node, style = { textAlign: 'center' }, ...props }) => (
          <td className="border border-base-950 p-1 pl-3 pr-3 dark:border-base-200 dark:text-base-200" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="blockquote_p mb-2 mt-2 border-l-4 border-l-base-500 bg-base-100 p-2 pl-4 text-base-500 dark:border-l-base-500 dark:bg-base-700"
            {...props}
          />
        ),
        sup: ({ node, children, ...props }) => (
          <sup className="[&>a]:before:content-['['] [&>a]:after:content-[']']" {...props}>
            {children}
          </sup>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
