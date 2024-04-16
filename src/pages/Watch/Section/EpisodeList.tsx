import { useParams } from 'react-router-dom';
import type { FC } from 'react';

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Episodes } from '@/services/anime/getAnimeInfo/types';

interface EpisodeListProps {
  currentEps: string;
  episodes: Episodes[];
}

const EpisodeList: FC<EpisodeListProps> = ({ currentEps, episodes }) => {
  const { slug } = useParams();

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Episode Lists</SheetTitle>
        <SheetDescription>Choose episode below</SheetDescription>
      </SheetHeader>
      <ScrollArea className="mt-2 h-[92vh]">
        {episodes.map((item, idx) => (
          <div
            key={idx}
            onClick={
              currentEps === String(item.number)
                ? () => {}
                : () => (window.location.href = `/watch/${slug}/${item.id}`)
            }
            className={`px-3 py-4 my-2 cursor-pointer ${
              currentEps === String(item.number) && 'bg-primary'
            } hover:bg-primary rounded-md`}
          >
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight flex items-center gap-2">
              Episode {item.number}{' '}
              {currentEps === String(item.number) && (
                <Badge variant="secondary">Curently watching</Badge>
              )}
            </h3>
          </div>
        ))}
      </ScrollArea>
    </SheetContent>
  );
};

export default EpisodeList;
