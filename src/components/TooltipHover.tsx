import type { FC, ReactNode } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TooltipHoverProps {
  children: ReactNode;
  tooltipContent: ReactNode;
  className?: string;
}

const TooltipHover: FC<TooltipHoverProps> = ({ children, tooltipContent }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipHover;
