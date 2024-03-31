import { ReactNode } from 'react';

export default function EditTitle({ children }: { children: ReactNode }) {
  return <h1 className="mb-4 h-16 p-1 text-3xl focus:outline-none dark:bg-base-700 dark:text-base-200">{children}</h1>;
}
