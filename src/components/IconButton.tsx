import type { FC, HTMLAttributes, ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  className?: HTMLAttributes<HTMLDivElement> | string;
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({
  children,
  className = '',
  onClick = () => {},
}) => {
  return (
    <div
      className={`rounded-full cursor-pointer p-2 w-min h-min ${className} hover:bg-primary`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconButton;
