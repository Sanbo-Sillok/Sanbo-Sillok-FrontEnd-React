import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutWithNav from './pages/layouts/LayoutWithNav';
import Home from './pages/Home';
import Wiki from './pages/Wiki';
import LayoutWithoutNav from './pages/layouts/LayoutWithoutNav';
import Login from './pages/Login';

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
