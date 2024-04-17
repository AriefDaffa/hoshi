import Navbar from './Navbar';
import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <Navbar />
      <div className="w-full max-w-screen-xl">{children}</div>
    </div>
  );
};

export default Layout;
