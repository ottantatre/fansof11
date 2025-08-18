import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { HomePage } from '@pages/Home';
import { LoginPage } from '@pages/Login';
import { NotFoundPage } from '@pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
