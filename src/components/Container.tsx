import type { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="bg-primary text-black w-full min-h-screen h-full relative">
      {children}
    </div>
  );
};

export default Container;
