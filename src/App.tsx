import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LayoutWithNav from '@/pages/layouts/LayoutWithNav';
import Home from '@/pages/Home';
import Wiki from '@/pages/Wiki';
import LayoutWithoutNav from '@/pages/layouts/LayoutWithoutNav';
import Login from '@/pages/Login';
import Edit from '@/pages/Edit';
import SignUp from '@/pages/SignUp';
import DefaultMetaTag from './components/common/DefaultMetaTag';

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter(
    [
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
            element: <Edit />,
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
