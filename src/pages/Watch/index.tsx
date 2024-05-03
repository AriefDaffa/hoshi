/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useFullscreen, useLocalStorage } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import type { OnProgressProps } from 'react-player/base';

import PlayerOverlay from './Section/PlayerOverlay';
import EpisodeList from './Section/EpisodeList';
import useGetAnimeInfo from '@/services/anime/getAnimeInfo/useGetAnimeInfo';
import useGetAnimeStreamURL from '@/services/anime/getAnimeStreamURL/useGetAnimeStreamURL';
import Layout from '@/components/Layout';

import AnimeDesc from './Section/AnimeDesc';
import BufferLoader from './Section/BufferLoader';

interface WatchProps {}

const Watch: FC<WatchProps> = () => {
  const { slug, id } = useParams();
  const { toggle, fullscreen: isFullScreen } = useFullscreen();

  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffer, setIsBuffer] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [played, setPlayed] = useState(0);
  const [secondPlayed, setSecondPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const [vidResolution, setVidResolution] = useLocalStorage({
    key: 'hoshi-vid-res',
    defaultValue: '0',
  });
  const [volume, setVolume] = useLocalStorage({
    key: 'hoshi-vid-vol',
    defaultValue: 0.6,
  });
  const [isWide, setIsWide] = useLocalStorage({
    key: 'hoshi-vid-wide',
    defaultValue: false,
  });

  const checkSlug = typeof slug === 'string' ? slug : '';
  const checkID = typeof id === 'string' ? id : '';

  const idSplit = checkID.split('-');

  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    isError: isAnimeInfoError,
  } = useGetAnimeInfo({
    id: checkSlug,
  });
  const {
    data: streamURL,
    isLoading: isAnimeStreamURLLoading,
    isError: isAnimeStreamURLError,
  } = useGetAnimeStreamURL({ id: checkID });

  const currentEps = idSplit[idSplit.length - 1] || '';

  const player = useRef<ReactPlayer>(null);

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handlePlayer = () => {
    setIsPlaying(!isPlaying);
  };

  const handleWide = () => {
    setIsWide(!isWide);
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
      (!isAnimeStreamURLLoading && streamURL.sources.length === 0)
    ) {
      navigate('/search');
    }
  }, [
    animeInfo,
    isAnimeInfoLoading,
    isAnimeStreamURLLoading,
    navigate,
    streamURL,
  ]);

  return (
    <Layout>
      <div
        className={`w-full h-full ${
          isFullScreen
            ? ''
            : `${isWide ? 'lg:flex-col' : 'lg:flex-row'} lg:flex lg:gap-4`
        } overflow-x-hidden`}
      >
        <div
          className={` ${
            isFullScreen ? '' : `${isWide ? 'lg:w-full' : 'lg:w-2/3'} pt-2`
          } `}
        >
          <div
            className={`relative  ${
              isFullScreen
                ? 'w-screen h-screen'
                : `w-full h-full lg:min-h-[30vh] lg:h-[70vh] ${
                    isWide ? 'lg:max-h-[760px]' : 'lg:max-h-[500px]'
                  } `
            }`}
          >
            {isBuffer && <BufferLoader />}
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
              handleWideOnClick={handleWide}
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
          <AnimeDesc
            {...animeInfo}
            currentEps={currentEps}
            isLoading={isAnimeInfoLoading}
            isError={isAnimeInfoError}
          />
        </div>
        <EpisodeList
          currentEps={currentEps}
          episodes={animeInfo.episodes}
          isWide={isWide}
          isLoading={isAnimeStreamURLLoading}
          isError={isAnimeStreamURLError}
        />
      </div>
    </Layout>
  );
};

export default Watch;
