/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactPlayer from 'react-player';
import { useIdle } from '@mantine/hooks';
import { OnProgressProps } from 'react-player/base';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import { useVideoStore } from '@/store/videoStore';
import type { AnimeStreamData } from '@/services/anime/getAnimeStreamURL/types';

interface useVideoProps {
  animeStream: AnimeStreamData;
  isAnimeStreamLoading: boolean;
  isAnimeInfoLoading: boolean;
  checkID: string;
  imgSrc: string;
  title: string;
}

const useVideo = ({
  animeStream,
  isAnimeInfoLoading,
  isAnimeStreamLoading,
  checkID,
  title,
  imgSrc,
}: useVideoProps) => {
  const [secondPlayed, setSecondPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffer, setIsBuffer] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isIdle = useIdle(1000);

  const {
    volume,
    resolution,
    handleVolume,
    handleResolutionChange,
    createWatch,
  } = useVideoStore();

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleVolume(parseFloat(e.target.value));
  };

  const handleResChange = (e: string) => {
    handleResolutionChange(e);
  };

  const videoURL = useMemo(() => {
    const filterURL = animeStream.sources.find((x) => x.quality === resolution);

    if (filterURL === undefined) {
      return animeStream.sources[0].url;
    } else {
      return filterURL.url;
    }
  }, [animeStream.sources, resolution]);

  const player = useRef<ReactPlayer>(null);

  const handleSeekMouseUp = (e: any) => {
    setIsSeeking(false);

    if (player.current !== null) {
      player.current.seekTo(parseFloat(e.target.value));
    }
  };

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
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

  const location = useLocation();

  const { handleProgress, episode } = useVideoStore();

  const videoSliderTime = useMemo(
    () => episode.find((el) => el.path === location.pathname)?.timeStamp || 0,
    [episode, location.pathname]
  );

  const handleOnProgress = (e: OnProgressProps) => {
    if (!isSeeking) {
      handleProgress(location.pathname, e.played);
    }
    setSecondPlayed(e.playedSeconds);
  };

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleProgress(location.pathname, parseFloat(e.target.value));
  };

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
          player.current.seekTo(videoSliderTime + 0.005);
        }
      }
    };

    const left = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && !isDialogOpen) {
        e.preventDefault();
        if (player.current !== null) {
          player.current.seekTo(videoSliderTime - 0.005);
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
  }, [isDialogOpen, isPlaying, videoSliderTime]);

  useEffect(() => {
    createWatch({
      imgSrc,
      path: location.pathname,
      title,
      episode: currentEps,
      timeStamp: videoSliderTime,
      duration,
    });

    if (videoURL) {
      player.current?.seekTo(videoSliderTime);
    }
  }, [
    createWatch,
    currentEps,
    duration,
    imgSrc,
    location.pathname,
    title,
    videoSliderTime,
    videoURL,
  ]);

  return {
    volume,
    resolution,
    isPlaying,
    handleVolumeChange,
    handleResChange,
    videoURL,
    secondPlayed,
    duration,
    setDuration,
    currentEps,
    parentLoading,
    checkIsPlaying,
    setIsBuffer,
    isDialogOpen,
    setIsDialogOpen,
    timeRunning: videoSliderTime,
    isSheetOpen,
    player,
    setIsPlaying,
    handleSeekChange,
    handleSeekMouseUp,
    handleSeekMouseDown,
    handleProgress: handleOnProgress,
    handlePlayer,
    handleSheetClose,
    handleSheetOpen,
  };
};

export default useVideo;
