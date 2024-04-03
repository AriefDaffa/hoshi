import { useState } from 'react';
import type { FC } from 'react';

import Container from '@/components/Container';

import PlayerOverlay from './Section/PlayerOverlay';

interface WatchProps {}

const Watch: FC<WatchProps> = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [played, setPlayed] = useState(0);

  console.log(played);

  return (
    <Container>
      <PlayerOverlay
        isPlaying={isPlaying}
        played={played}
        setPlayed={setPlayed}
      />
      {/* <div className="w-screen h-screen">
        <img
          src="https://i.pinimg.com/originals/bb/77/a7/bb77a7934fe03260af8380f63ae3f6fe.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div> */}
      {/* <div>Watch</div> */}
    </Container>
  );
};

export default Watch;
