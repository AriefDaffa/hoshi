/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaPause, FaPlay, FaVolumeDown } from 'react-icons/fa';
import { RiFullscreenExitFill, RiFullscreenFill } from 'react-icons/ri';
import { useFullscreen } from '@mantine/hooks';
import type { ChangeEvent, FC } from 'react';

import { convertSec } from '@/utils/convertSec';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AnimeStreamSources } from '@/services/anime/getAnimeStreamURL/types';

interface BottomMenuProps {
  isPlaying: boolean;
  played: number;
  duration: number;
  timePlayed: number;
  volume: number;
  resolution: string;
  resolutionList: AnimeStreamSources[];
  handlePlay: () => void;
  handleSeekMouseDown: () => void;
  handleSeekMouseUp: (e: any) => void;
  handleResChange: (e: string) => void;
  handleVolumeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSeekChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BottomMenu: FC<BottomMenuProps> = ({
  isPlaying,
  played,
  duration,
  timePlayed,
  resolutionList,
  volume,
  resolution,
  handlePlay,
  handleSeekChange,
  handleSeekMouseDown,
  handleSeekMouseUp,
  handleVolumeChange,
  handleResChange,
  // handleVolumeChange,
}) => {
  const [showVolume, setShowVolume] = useState(false);

  const { toggle, fullscreen: isFullScreen } = useFullscreen();

  const getBackgroundSize = (isVol = false) => {
    return { backgroundSize: `${(isVol ? volume : played) * 100}% 100%` };
  };

  const onMouseEnterVolume = () => {
    setShowVolume(true);
  };

  const onMouseLeaveVolume = () => {
    setShowVolume(false);
  };

  console.log('rex-2', played);

  return (
    <div className="p-2" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between w-full">
        <div className="text-sm font-light">{convertSec(timePlayed)}</div>
        <div className="text-sm font-light">{convertSec(duration)}</div>
      </div>
      <input
        type="range"
        min="0"
        max="0.99999"
        step="any"
        className="w-full cursor-pointer slider-player"
        style={getBackgroundSize()}
        value={played}
        onChange={handleSeekChange}
        onMouseDown={handleSeekMouseDown}
        onMouseUp={handleSeekMouseUp}
      />
      <div className="flex justify-between mt-1">
        <div className="flex">
          <Button variant="ghost" size="icon" onClick={handlePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </Button>
          <Button
            variant="link"
            className="flex gap-2"
            onMouseEnter={onMouseEnterVolume}
            onMouseLeave={onMouseLeaveVolume}
          >
            <FaVolumeDown size={20} className="text-white" />
            <AnimatePresence>
              {showVolume && (
                <motion.input
                  type="range"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  value={volume}
                  min={0}
                  max={1}
                  step={0.0001}
                  onClick={(e) => e.stopPropagation()}
                  style={getBackgroundSize(true)}
                  className="slider-vol w-[80px]"
                  onChange={handleVolumeChange}
                />
              )}
            </AnimatePresence>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={resolution} onValueChange={handleResChange}>
            <SelectTrigger className="border-0 w-min">
              <SelectValue placeholder="480p" />
            </SelectTrigger>
            <SelectContent>
              {resolutionList.map((item, idx) => (
                <SelectItem key={idx} value={item.quality}>
                  {item.quality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" onClick={toggle}>
            {isFullScreen ? <RiFullscreenExitFill /> : <RiFullscreenFill />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomMenu;
