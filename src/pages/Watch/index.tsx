import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useFullscreen } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import type { OnProgressProps } from 'react-player/base';

import PlayerOverlay from './Section/PlayerOverlay';
import EpisodeList from './Section/EpisodeList';
import useGetAnimeInfo from '@/services/anime/getAnimeInfo/useGetAnimeInfo';
import useGetAnimeStreamURL from '@/services/anime/getAnimeStreamURL/useGetAnimeStreamURL';
import Layout from '@/components/Layout';

import AnimeDesc from './Section/AnimeDesc';
interface WatchProps {}

const Watch: FC<WatchProps> = () => {
  const { slug, id } = useParams();
  const { toggle, fullscreen: isFullScreen } = useFullscreen();

  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffer, setIsBuffer] = useState(false);
  const [vidResolution, setVidResolution] = useState('0');
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [isSeeking, setIsSeeking] = useState(false);
  const [secondPlayed, setSecondPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const checkSlug = typeof slug === 'string' ? slug : '';
  const checkID = typeof id === 'string' ? id : '';

  const idSplit = checkID.split('-');

  const { data: animeInfo, isLoading: isAnimeInfoLoading } = useGetAnimeInfo({
    id: checkSlug,
  });
  const { data: streamURL, isLoading: isAnimeStreamURL } = useGetAnimeStreamURL(
    { id: checkID }
  );

  const currentEps = idSplit[idSplit.length - 1] || '';

  const player = useRef<ReactPlayer>(null);

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handlePlayer = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (e: OnProgressProps) => {
    if (!isSeeking) {
      setPlayed(e.played);
    }
    setSecondPlayed(e.playedSeconds);
  };

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSeekMouseUp = (e: any) => {
    setIsSeeking(false);

    if (player.current !== null) {
      player.current.seekTo(parseFloat(e.target.value));
    }
  };

  const handleResolutionChange = (e: string) => {
    setVidResolution(e);
  };

  useEffect(() => {
    if (
      (!isAnimeInfoLoading && animeInfo.episodes.length === 0) ||
      (!isAnimeStreamURL && streamURL.sources.length === 0)
    ) {
      navigate('/search');
    }
  }, [animeInfo, isAnimeInfoLoading, isAnimeStreamURL, navigate, streamURL]);

  console.log(isBuffer);

  return (
    <Layout>
      <div
        className={`w-full h-full ${isFullScreen ? '' : ' lg:flex lg:gap-4'}`}
      >
        <div className={` ${isFullScreen ? '' : 'lg:w-2/3 pt-2'} `}>
          <div
            className={`relative  ${
              isFullScreen ? '' : 'w-full h-full lg:h-[70vh]'
            }`}
          >
            <PlayerOverlay
              duration={duration}
              isPlaying={isPlaying}
              played={played}
              volume={volume}
              timePlayed={secondPlayed}
              isFullScreen={isFullScreen}
              vidResolution={vidResolution}
              onClick={handlePlayer}
              resolutionList={streamURL.sources}
              handleFullScreen={toggle}
              handleSeekMouseDown={handleSeekMouseDown}
              handleSeekMouseUp={handleSeekMouseUp}
              handleSeekChange={handleSeekChange}
              handleVolumeChange={handleVolumeChange}
              handleResolutionChange={handleResolutionChange}
            />
            <ReactPlayer
              key={`${slug}-${id}`}
              ref={player}
              url={streamURL.sources[Number(vidResolution || 0)]?.url}
              width={'100%'}
              height={'100%'}
              volume={volume}
              playing={isPlaying}
              onProgress={handleProgress}
              onBuffer={() => setIsBuffer(true)}
              onBufferEnd={() => {
                setIsBuffer(false);
                setIsPlaying(true);
              }}
              onDuration={(e) => setDuration(e)}
            />
          </div>
          {!isAnimeInfoLoading && (
            <AnimeDesc {...animeInfo} currentEps={currentEps} />
          )}
        </div>
        {!isAnimeInfoLoading && (
          <EpisodeList episodes={animeInfo.episodes} currentEps={currentEps} />
        )}
      </div>
    </Layout>
  );
};

export default Watch;
