import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import type { Episodes } from '@/services/anime/getAnimeInfo/types';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface SheetEpisodeProps {
  isOpen: boolean;
  currentEps: string;
  animeID: string;
  episodes: Episodes[];
  onSheetClose: () => void;
}

const SheetEpisode: FC<SheetEpisodeProps> = ({
  isOpen,
  episodes,
  animeID,
  currentEps,
  onSheetClose,
}) => {
  const navigate = useNavigate();

  return (
    <Sheet open={isOpen} onOpenChange={onSheetClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Episode List</SheetTitle>
          <SheetDescription>Pick your anime episode below</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex flex-col gap-4 h-full pb-10">
          {episodes.map((item, idx) => (
            <Button
              variant="ghost"
              key={idx}
              className="w-full my-2"
              disabled={currentEps === String(item.number)}
              onClick={() => navigate(`/watch/${animeID}/${item.id}`)}
            >
              <div className="w-full text-left">Episode {item.number}</div>
              {currentEps === String(item.number) && (
                <Badge>Currently Watching</Badge>
              )}
            </Button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SheetEpisode;
