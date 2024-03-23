import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Wiki from './pages/Wiki';
import Home from './pages/Home';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/:id',
      element: <Wiki />,
    },
  ]);

  return <RouterProvider router={router} />;
}
