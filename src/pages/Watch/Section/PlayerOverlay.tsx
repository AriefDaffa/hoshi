/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef, useState } from 'react';
import { FaVolumeDown } from 'react-icons/fa';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { TbSquareRounded } from 'react-icons/tb';
import { IoSettingsSharp } from 'react-icons/io5';
import { useIdle } from '@mantine/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { ChangeEvent, FC } from 'react';

import IconButton from '@/components/IconButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { convertSec } from '@/utils/convertSec';
import TooltipHover from '@/components/TooltipHover';
import type { AnimeStreamSources } from '@/services/anime/getAnimeStreamURL/types';

interface PlayerOverlayProps {
  isPlaying: boolean;
  isFullScreen: boolean;
  played: number;
  volume: number;
  duration: number;
  timePlayed: number;
  vidResolution: string;
  resolutionList: AnimeStreamSources[];
  server: string;
  onClick: () => void;
  handleSeekMouseDown: () => void;
  handleSeekMouseUp: (e: any) => void;
  handleResolutionChange: (e: string) => void;
  handleSeekChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleWideOnClick: () => void;
  handleFullScreen: () => void;
  handleServerChange: (val: 'gogocdn' | 'streamsb' | 'vidstreaming') => void;
}

const PlayerOverlay: FC<PlayerOverlayProps> = ({
  played,
  isPlaying,
  isFullScreen,
  volume,
  duration,
  timePlayed,
  vidResolution,
  resolutionList,
  server,
  onClick,
  handleSeekMouseDown,
  handleSeekMouseUp,
  handleSeekChange,
  handleVolumeChange,
  handleResolutionChange,
  handleWideOnClick,
  handleFullScreen,
  handleServerChange,
}) => {
  const [openVolume, setOpenVolume] = useState(false);

  const isIdle = useIdle(1000);

  const inputRef = useRef(null);

  const getBackgroundSize = (isVol = false) => {
    return { backgroundSize: `${(isVol ? volume : played) * 100}% 100%` };
  };

  const checkIsPlaying = useMemo(
    () => (isPlaying ? isIdle : isPlaying),
    [isIdle, isPlaying]
  );

  return (
    <div
      className="w-full h-full flex items-end absolute bottom-0 z-10"
      onClick={onClick}
    >
      <AnimatePresence>
        {!checkIsPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`px-2 w-full ${
              !checkIsPlaying ? 'player-gradient' : ''
            }`}
          >
            <div className="text-sm pt-2">
              {convertSec(timePlayed || 0)} / {convertSec(duration || 0)}
            </div>
            <div
              className="w-full flex items-center gap-1 "
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton>
                {isPlaying ? (
                  <FaPause size={16} className="cursor-pointer" />
                ) : (
                  <FaPlay size={16} className="cursor-pointer" />
                )}
              </IconButton>
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
              <div
                className="relative"
                onMouseEnter={() => setOpenVolume(true)}
                onMouseLeave={() => setOpenVolume(false)}
              >
                <IconButton>
                  <FaVolumeDown size={20} className="cursor-pointer" />
                </IconButton>
                <AnimatePresence>
                  {openVolume && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-2 py-4 rounded-md absolute w-[200px] bottom-[350%] -left-[225%] rotate-[270deg] bg-black flex items-center"
                    >
                      <input
                        type="range"
                        value={volume}
                        ref={inputRef}
                        min={0}
                        max={1}
                        step={0.0001}
                        onClick={(e) => e.stopPropagation()}
                        style={getBackgroundSize(true)}
                        className="slider-vol w-full "
                        onChange={handleVolumeChange}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Dialog>
                <DialogTrigger className="h-full flex items-center">
                  <TooltipHover tooltipContent={'Settings'}>
                    <IconButton>
                      <IoSettingsSharp size={16} />
                    </IconButton>
                  </TooltipHover>
                </DialogTrigger>
                <DialogContent className="max-w-[500px]">
                  <h4 className=" text-xl font-semibold tracking-tight">
                    Resolution
                  </h4>
                  <Select
                    value={vidResolution}
                    onValueChange={handleResolutionChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="480p" />
                    </SelectTrigger>
                    <SelectContent>
                      {resolutionList?.map((item, idx) => (
                        <SelectItem key={idx} value={String(idx)}>
                          {item.quality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <h4 className=" text-xl font-semibold tracking-tight">
                      Server
                    </h4>
                    <ToggleGroup
                      type="single"
                      defaultValue="gogocdn"
                      className="grid grid-cols-2"
                      value={server}
                      onValueChange={handleServerChange}
                    >
                      <ToggleGroupItem value="gogocdn" className="w-full">
                        gogocdn
                      </ToggleGroupItem>
                      <ToggleGroupItem value="streamsb" className="w-full">
                        streamsb
                      </ToggleGroupItem>
                      <ToggleGroupItem value="vidstreaming" className="w-full">
                        vidstreaming
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </Select>
                </DialogContent>
              </Dialog>
              <TooltipHover tooltipContent={'Wide View'}>
                <IconButton onClick={handleWideOnClick}>
                  <TbSquareRounded size={22} />
                </IconButton>
              </TooltipHover>
              <TooltipHover tooltipContent={'Fullscreen'}>
                <IconButton>
                  {isFullScreen ? (
                    <MdFullscreenExit
                      size={22}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFullScreen();
                      }}
                    />
                  ) : (
                    <MdFullscreen
                      size={22}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFullScreen();
                      }}
                    />
                  )}
                </IconButton>
              </TooltipHover>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlayerOverlay;
