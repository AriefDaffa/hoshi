import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-full max-w-screen-xl">{children}</div>
    </div>
  );
};

export default Layout;
