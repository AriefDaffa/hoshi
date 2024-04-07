import { useState } from 'react';
import type { FC } from 'react';

import Container from '@/components/Container';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import PlayerOverlay from './Section/PlayerOverlay';

interface WatchProps {}

const Watch: FC<WatchProps> = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [played, setPlayed] = useState(0);

  return (
    <Container>
      <Sheet>
        <div className="w-full h-full relative overflow-hidden">
          <PlayerOverlay
            played={played}
            isPlaying={isPlaying}
            setPlayed={setPlayed}
          />
          <div className="w-screen h-screen">
            <img
              src="https://i.pinimg.com/originals/bb/77/a7/bb77a7934fe03260af8380f63ae3f6fe.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Container>
  );
};

export default Watch;
