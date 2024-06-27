import { useLocation } from 'react-router-dom';
import { useFullscreen } from '@mantine/hooks';
import type { FC, ReactNode } from 'react';

import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { fullscreen: isFullScreen } = useFullscreen();
  const location = useLocation();

  const checkFullScreen = isFullScreen && location.pathname.includes('episode');

  return (
    <div className="w-full h-full flex flex-col items-center relative z-30 ">
      {!checkFullScreen && <Navbar />}
      <div className={`w-full ${checkFullScreen ? '' : 'max-w-screen-xl'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
