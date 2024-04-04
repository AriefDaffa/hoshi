import type { FC, ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
}

const IconButton: FC<IconButtonProps> = ({ children }) => {
  return (
    <div className="rounded-full cursor-pointer p-2 w-min h-min hover:bg-primary">
      {children}
    </div>
  );
};

export default IconButton;
