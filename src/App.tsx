import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/components/theme-provider';

import Home from './pages/Home';
import Watch from './pages/Watch';
import Trending from './pages/Trending';
import AnimeDetail from './pages/AnimeDetail';
import { NavbarContextProvider } from './context/NavbarContext';

const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/detail/:id',
      element: <AnimeDetail />,
    },
    {
      path: '/watch/:slug/:id',
      element: <Watch />,
    },
    {
      path: '/trending',
      element: <Trending />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavbarContextProvider>
          <RouterProvider router={router} />
        </NavbarContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
