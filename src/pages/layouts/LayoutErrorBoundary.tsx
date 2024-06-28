import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import ServerError from '../ServerError';

export default function LayoutErrorBoundary() {
  return (
    <ErrorBoundary resetKeys={[useLocation().pathname]} FallbackComponent={ServerError}>
      <Outlet />
    </ErrorBoundary>
  );
}
