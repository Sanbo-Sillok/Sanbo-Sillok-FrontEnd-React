import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';

export default function LayoutWithNav() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-base-100">
        <section className="m-auto min-h-screen max-w-6xl bg-white pt-16">
          <Outlet />
        </section>
      </main>
    </>
  );
}
