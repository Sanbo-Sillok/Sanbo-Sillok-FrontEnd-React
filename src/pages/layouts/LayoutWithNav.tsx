import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar/NavBar';

export default function LayoutWithNav() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        <section className="m-auto h-full min-h-screen max-w-6xl bg-white pt-16 dark:bg-base-800">
          <Outlet />
        </section>
      </main>
    </>
  );
}
