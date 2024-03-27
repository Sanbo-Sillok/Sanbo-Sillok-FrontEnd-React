/* eslint-disable */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

export default function MarkdownToHTML({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        h1: ({ node, children, ...props }) => (
          <h1
            className="mb-2 mt-14 border-b pb-2 text-3xl font-semibold dark:border-zinc-500 dark:text-zinc-300"
            id={String(children).replaceAll(' ', '-').toLowerCase()}
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ node, children, ...props }) => (
          <h2
            className="mb-2 mt-7 border-b pb-2 text-2xl font-semibold dark:border-zinc-500 dark:text-zinc-300"
            id={String(children).replaceAll(' ', '-').toLowerCase()}
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3
            className="mb-2 mt-7 border-b pb-2 text-xl font-semibold dark:border-zinc-500 dark:text-zinc-300"
            id={String(children).replaceAll(' ', '-').toLowerCase()}
            {...props}
          >
            {children}
          </h3>
        ),
        a: ({ node, ...props }) => <a className="text-sanbo-blue" {...props} />,
        p: ({ node, ...props }) => <p className="mb-5 mt-1 dark:text-zinc-300" {...props} />,
        li: ({ node, ...props }) => <li className="mb-2 mt-2 dark:text-zinc-300 [&>p]:mb-1" {...props} />,
        ul: ({ node, ...props }) => <ul className="mb-1 ml-5 mt-1 list-disc dark:text-zinc-300" {...props} />,
        ol: ({ node, ...props }) => <ol className="mb-1 ml-5 mt-1 list-decimal dark:text-zinc-300" {...props} />,
        pre: ({ node, ...props }) => (
          <pre className="block w-full rounded-lg bg-slate-100 p-8 text-sm dark:bg-zinc-600 dark:text-zinc-300" {...props} />
        ),
        code: ({ node, ...props }) => (
          <code className="rounded bg-slate-100 p-1 pb-0.5 pt-0.5 text-sm dark:bg-zinc-600 dark:text-zinc-300" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="border border-slate-950 p-1 pl-3 pr-3 dark:border-zinc-300 dark:text-zinc-300" {...props} />
        ),
        td: ({ node, style = { textAlign: 'center' }, ...props }) => (
          <td className="border border-slate-950 p-1 pl-3 pr-3 dark:border-zinc-300 dark:text-zinc-300" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="blockquote_p mb-2 mt-2 border-l-4 border-l-slate-500 bg-stone-100 p-2 pl-4 text-slate-500 dark:border-l-zinc-500 dark:bg-zinc-700"
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
