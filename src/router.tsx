import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { HomePage } from '@pages/HomePage';
import { AboutPage } from '@pages/AboutPage';

// Definicja tras
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
