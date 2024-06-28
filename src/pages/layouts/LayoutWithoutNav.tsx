import { Outlet } from 'react-router-dom';

export default function LayoutWithoutNav() {
  return (
    <section className="w-sreen h-screen bg-base-100 dark:bg-base-800">
      <Outlet />
    </section>
  );
}
