import { ReactNode } from 'react';

export default function EditTitle({ children }: { children: ReactNode }) {
  return <h1 className="mb-4 h-16 bg-transparent p-1 text-3xl focus:outline-none dark:text-base-200">{children}</h1>;
}
