import ReactPlayer from 'react-player';
import type { FC } from 'react';

interface PlayerProps {
  url: string;
}

const Player: FC<PlayerProps> = ({ url }) => {
  return (
    <ReactPlayer url={url} width={'100%'} height={'100vh'} controls={false} />
  );
};

export default Player;
