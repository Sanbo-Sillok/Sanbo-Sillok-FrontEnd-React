import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import NavBar from '@/components/NavBar/NavBar';
import ServerError from '../ServerError';

export default function LayoutWithNav() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        <section className="m-auto h-full min-h-screen max-w-6xl bg-white pt-16 dark:bg-base-800">
          <ErrorBoundary resetKeys={[useLocation().pathname]} FallbackComponent={ServerError}>
            <Outlet />
          </ErrorBoundary>
        </section>
      </main>
    </>
  );
}
