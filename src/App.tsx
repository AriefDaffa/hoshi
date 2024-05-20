import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@/components/theme-provider';

import Home from './pages/Home';
import Watch from './pages/Watch';
// import Search from './pages/Search';
import Trending from './pages/Trending';
import AnimeDetail from './pages/AnimeDetail';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/watch/:slug/:id',
      element: <Watch />,
    },
    {
      path: '/trending',
      element: <Trending />,
    },
    {
      path: '/search/:id',
      element: <AnimeDetail />,
    },
    {
      path: '/:id',
      element: <AnimeDetail />,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
