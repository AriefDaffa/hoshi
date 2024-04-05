import type { FC, ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({ children, onClick = () => {} }) => {
  return (
    <div
      className="rounded-full cursor-pointer p-2 w-min h-min hover:bg-primary"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconButton;
