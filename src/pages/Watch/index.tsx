/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import type { FC } from 'react';

import useGetAnimeInfo from '@/services/anime/getAnimeInfo/useGetAnimeInfo';
import useGetAnimeStreamURL from '@/services/anime/getAnimeStreamURL/useGetAnimeStreamURL';
import BottomMenu from './Section/BottomMenu';
import TopMenu from './Section/TopMenu';
import SheetEpisode from './Section/SheetEpisode';
import useVideo from '@/hooks/player/useVideo';

interface WatchProps {}

const Watch: FC<WatchProps> = () => {
  const { slug, id } = useParams();

  const checkSlug = typeof slug === 'string' ? slug : '';
  const checkID = typeof id === 'string' ? id : '';

  const { data: animeStream, isLoading: isAnimeStreamLoading } =
    useGetAnimeStreamURL({ id: checkID, server: 'gogocdn' });
  const { data: animeDetails, isLoading: isAnimeInfoLoading } = useGetAnimeInfo(
    { id: checkSlug }
  );

  const {
    checkIsPlaying,
    currentEps,
    duration,
    handlePlayer,
    handleProgress,
    handleResChange,
    handleSeekChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleSheetClose,
    handleSheetOpen,
    handleVolumeChange,
    parentLoading,
    resolution,
    isPlaying,
    secondPlayed,
    setDuration,
    setIsBuffer,
    setIsDialogOpen,
    videoURL,
    volume,
    isDialogOpen,
    isSheetOpen,
    player,
    timeRunning,
    setIsPlaying,
  } = useVideo({
    animeStream,
    checkID,
    isAnimeInfoLoading,
    isAnimeStreamLoading,
    imgSrc: animeDetails.image,
    title: animeDetails.title,
  });

  return (
    <div className="relative w-screen h-screen">
      {parentLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 m-auto size-min ">
          <AiOutlineLoading3Quarters size={50} className="animate-spin" />
        </div>
      )}
      <div className="absolute top-0 z-10 size-full">
        <AnimatePresence>
          {!checkIsPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex flex-col justify-between size-full"
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
                volume={volume}
                resolution={resolution}
                handleVolumeChange={handleVolumeChange}
                handleResChange={handleResChange}
                duration={duration}
                timePlayed={secondPlayed}
                played={timeRunning}
                isPlaying={isPlaying}
                resolutionList={animeStream.sources}
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
