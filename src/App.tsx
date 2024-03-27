import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Wiki from './pages/Wiki';
import Home from './pages/Home';
import LayoutWithNav from './pages/layouts/LayoutWithNav';
import Login from './pages/Login';
import LayoutWithoutNav from './pages/layouts/LayoutWithoutNav';

export default function App() {
  const router = createBrowserRouter([
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
