import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Wiki from './pages/Wiki';
import Home from './pages/Home';
import LayoutWithNav from './pages/layouts/LayoutWithNav';
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
          path: '/:id',
          element: <Wiki />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}
