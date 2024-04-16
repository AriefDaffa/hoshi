import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@/components/theme-provider';

import Home from './pages/Home';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Trending from './pages/Trending';
import Detail from './pages/Search/Detail';

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
      path: '/search',
      element: <Search />,
    },
    {
      path: '/trending',
      element: <Trending />,
    },
    {
      path: '/search/:id',
      element: <Detail />,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
