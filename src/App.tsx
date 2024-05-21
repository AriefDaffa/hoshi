import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@/components/theme-provider';

import Home from './pages/Home';
import Watch from './pages/Watch';
import Trending from './pages/Trending';
import AnimeDetail from './pages/AnimeDetail';
import { NavbarContextProvider } from './context/NavbarContext';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/:slug/:id',
      element: <Watch />,
    },
    {
      path: '/trending',
      element: <Trending />,
    },
    {
      path: '/:id',
      element: <AnimeDetail />,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavbarContextProvider>
        <RouterProvider router={router} />
      </NavbarContextProvider>
    </ThemeProvider>
  );
};

export default App;
