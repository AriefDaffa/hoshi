import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Watch from './pages/Watch';

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
  ]);

  return <RouterProvider router={router} />;
};

export default App;
