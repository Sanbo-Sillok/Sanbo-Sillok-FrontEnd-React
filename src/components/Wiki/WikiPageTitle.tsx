interface PageTitleProps {
  children: React.ReactNode;
}

export default function WikiPageTitle({ children }: PageTitleProps) {
  return <h1 className="pb-6 text-4xl font-semibold dark:text-base-200">{children}</h1>;
}
