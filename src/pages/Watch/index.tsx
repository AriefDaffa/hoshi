/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { useIdle } from '@mantine/hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import type { ChangeEvent, FC } from 'react';
import type { OnProgressProps } from 'react-player/base';

import useGetAnimeInfo from '@/services/anime/getAnimeInfo/useGetAnimeInfo';
import useGetAnimeStreamURL from '@/services/anime/getAnimeStreamURL/useGetAnimeStreamURL';
import BottomMenu from './Section/BottomMenu';
import TopMenu from './Section/TopMenu';
import SheetEpisode from './Section/SheetEpisode';
import useVidVolume from './hooks/useVidVolume';
import useVidResolution from './hooks/useVidResolution';

interface WatchProps {}

const Watch: FC<WatchProps> = () => {
  const { slug, id } = useParams();
  const [isSeeking, setIsSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffer, setIsBuffer] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [timeRunning, setTimeRunning] = useState(0);
  const [secondPlayed, setSecondPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const isIdle = useIdle(1000);

  const checkSlug = typeof slug === 'string' ? slug : '';
  const checkID = typeof id === 'string' ? id : '';

  const { data: animeStream, isLoading: isAnimeStreamLoading } =
    useGetAnimeStreamURL({ id: checkID, server: 'gogocdn' });
  const { data: animeDetails, isLoading: isAnimeInfoLoading } = useGetAnimeInfo(
    { id: checkSlug }
  );

  console.log(animeDetails);

  // custom hooks
  const { vidResolution } = useVidResolution();
  const { volume } = useVidVolume();

  const player = useRef<ReactPlayer>(null);

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeRunning(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: any) => {
    setIsSeeking(false);

    if (player.current !== null) {
      player.current.seekTo(parseFloat(e.target.value));
    }
  };

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  const handleProgress = (e: OnProgressProps) => {
    if (!isSeeking) {
      setTimeRunning(e.played);
    }
    setSecondPlayed(e.playedSeconds);
  };

  const handlePlayer = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSheetClose = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  const handleSheetOpen = useCallback(() => {
    setIsSheetOpen(true);
  }, []);

  const currentEps = useMemo(() => {
    const splittedArr = checkID.split('-');

    return splittedArr[splittedArr.length - 1] || '';
  }, [checkID]);

  const parentLoading = useMemo(() => {
    return isAnimeStreamLoading || isAnimeInfoLoading || isBuffer;
  }, [isAnimeInfoLoading, isAnimeStreamLoading, isBuffer]);

  const checkIsPlaying = useMemo(() => {
    if (isPlaying) {
      if (isSheetOpen) {
        return false;
      } else {
        return isIdle;
      }
    } else {
      return isPlaying;
    }
  }, [isIdle, isPlaying, isSheetOpen]);

  const videoURL = useMemo(() => {
    const filterURL = animeStream.sources.find(
      (x) => x.quality === vidResolution
    );

    if (filterURL === undefined) {
      return animeStream.sources[0].url;
    } else {
      return filterURL.url;
    }
  }, [animeStream.sources, vidResolution]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === ' ' && !isDialogOpen) {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    const right = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isDialogOpen) {
        e.preventDefault();
        if (player.current !== null) {
          player.current.seekTo(timeRunning + 0.005);
        }
      }
    };

    const left = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && !isDialogOpen) {
        e.preventDefault();
        if (player.current !== null) {
          player.current.seekTo(timeRunning - 0.005);
        }
      }
    };

    document.addEventListener('keydown', down);
    document.addEventListener('keydown', right);
    document.addEventListener('keydown', left);
    return () => {
      document.removeEventListener('keydown', down);
      document.removeEventListener('keydown', right);
      document.removeEventListener('keydown', left);
    };
  }, [isDialogOpen, isPlaying, timeRunning]);

  return (
    <div className="w-screen h-screen relative">
      {parentLoading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 m-auto size-min ">
          <AiOutlineLoading3Quarters size={50} className="animate-spin" />
        </div>
      )}
      <div className="size-full absolute top-0 z-10">
        <AnimatePresence>
          {!checkIsPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              className="size-full flex flex-col justify-between relative"
              onClick={handlePlayer}
            >
              <TopMenu
                animeInfo={animeDetails}
                currentEps={currentEps}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                handleSheetOpen={handleSheetOpen}
              />
              <BottomMenu
                duration={duration}
                timePlayed={secondPlayed}
                played={timeRunning}
                volume={volume}
                isPlaying={isPlaying}
                resolutionList={animeStream.sources}
                selectedResolution={vidResolution}
                handlePlay={handlePlayer}
                handleSeekChange={handleSeekChange}
                handleSeekMouseDown={handleSeekMouseDown}
                handleSeekMouseUp={handleSeekMouseUp}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <SheetEpisode
          currentEps={currentEps}
          animeID={animeDetails.id}
          episodes={animeDetails.episodes}
          isOpen={isSheetOpen}
          onSheetClose={handleSheetClose}
        />
      </div>
      <ReactPlayer
        key={`${slug}-${id}`}
        ref={player}
        url={videoURL}
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
  );
};

export default Watch;
