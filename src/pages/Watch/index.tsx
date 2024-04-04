import { useState } from 'react';
import type { FC } from 'react';

import Container from '@/components/Container';
import PlayerOverlay from './Section/PlayerOverlay';
import EpisodeList from './Section/EpisodeList';

interface WatchProps {}

const Watch: FC<WatchProps> = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [played, setPlayed] = useState(0);
  const [openEpsList, setOpenEpsList] = useState(false);

  const handleEpsList = () => {
    setOpenEpsList(!openEpsList);
  };

  return (
    <Container>
      <div className="w-full h-full relative overflow-hidden">
        <PlayerOverlay
          played={played}
          isPlaying={isPlaying}
          setPlayed={setPlayed}
          onEpsListClick={handleEpsList}
        />
        <EpisodeList isOpen={openEpsList} onClose={handleEpsList} />
        <div className="w-screen h-screen">
          <img
            src="https://i.pinimg.com/originals/bb/77/a7/bb77a7934fe03260af8380f63ae3f6fe.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Container>
  );
};

export default Watch;
