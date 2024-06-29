import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LayoutErrorBoundary from '@/pages/layouts/LayoutErrorBoundary';
import LayoutWithNav from '@/pages/layouts/LayoutWithNav';
import LayoutWithoutNav from '@/pages/layouts/LayoutWithoutNav';
import Home from '@/pages/Home';
import Wiki from '@/pages/Wiki/Wiki';
import Admin from '@/pages/Admin/Admin';
import Login from '@/pages/Auth/Login';
import WikiEdit from '@/pages/WikiEdit/WikiEdit';
import SignUp from '@/pages/Auth/SignUp';
import DefaultMetaTag from './components/common/DefaultMetaTag';

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter(
    [
      {
        element: <LayoutErrorBoundary />,
        children: [
          {
            path: '/',
            element: <LayoutWithNav />,
            children: [
              {
                path: '/',
                element: <Home />,
              },
              {
                path: '/wiki/:pageTitle',
                element: <Wiki />,
              },
              {
                path: '/admin',
                element: <Admin />,
              },
            ],
          },
          {
            path: '/',
            element: <LayoutWithoutNav />,
            children: [
              {
                path: '/login',
                element: <Login />,
              },
              {
                path: '/signup',
                element: <SignUp />,
              },
              {
                path: '/edit/:pageTitle',
                element: <WikiEdit />,
              },
            ],
          },
        ],
      },
    ],
    { basename: import.meta.env.BASE_URL },
  );

  return (
    <QueryClientProvider client={queryClient}>
      <DefaultMetaTag />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
