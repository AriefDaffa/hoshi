import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@/components/theme-provider';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Search from './pages/Search';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/watch',
      element: <Watch />,
    },
    {
      path: '/search',
      element: <Search />,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
