import type { FC } from 'react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface EpisodeListProps {
  isOpen: boolean;
  onClose: () => void;
}

const EpisodeList: FC<EpisodeListProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`absolute h-full w-full transition-all ${
        isOpen ? 'left-full' : '-left-0'
      }`}
    >
      <div
        className={`w-full h-full relative transition-all ease-in-out delay-100 bg-red-100 ${
          isOpen ? 'bg-opacity-0' : 'bg-opacity-1'
        }`}
        // style={{ backgroundColor: 'rgba(18, 18, 18, 0.32)' }}
        onClick={onClose}
      >
        <div
          className={` h-full p-2 px-4 bg-black border absolute right-0 transition-all w-full max-w-96`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mt-2">
            <div className="space-y-2 text-white">
              <h4 className="font-medium leading-none">Episode Lists</h4>
              <p className="text-sm text-muted-foreground">Choose episode</p>
            </div>
          </div>
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeList;
