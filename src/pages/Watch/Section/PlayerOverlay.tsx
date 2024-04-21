import { useMemo } from 'react';
import { FaVolumeDown } from 'react-icons/fa';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5';
import { useIdle } from '@mantine/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import type { ChangeEvent, FC } from 'react';

import IconButton from '@/components/IconButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { SheetTrigger } from '@/components/ui/sheet';
import { convertSec } from '@/utils/convertSec';
import type { AnimeStreamSources } from '@/services/anime/getAnimeStreamURL/types';
import { uppercaseLetter } from '@/utils/uppercaseLetter';
import { kebabToNormal } from '@/utils/kebabToNormal';

interface PlayerOverlayProps {
  isPlaying: boolean;
  isFullScreen: boolean;
  played: number;
  volume: number;
  duration: number;
  timePlayed: number;
  currentEps: string;
  vidResolution: string;
  animeTitle: string;
  animeDesc: string;
  resolutionList: AnimeStreamSources[];
  onClick: () => void;
  handleSeekMouseDown: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSeekMouseUp: (e: any) => void;
  handleResolutionChange: (e: string) => void;
  handleSeekChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFullScreen: () => void;
}

const PlayerOverlay: FC<PlayerOverlayProps> = ({
  played,
  isPlaying,
  isFullScreen,
  volume,
  duration,
  timePlayed,
  currentEps,
  vidResolution,
  resolutionList,
  onClick,
  handleSeekMouseDown,
  handleSeekMouseUp,
  handleSeekChange,
  handleVolumeChange,
  handleResolutionChange,
  handleFullScreen,
}) => {
  const { slug } = useParams();
  const isIdle = useIdle(1000);

  const getBackgroundSize = (isVol = false) => {
    return { backgroundSize: `${(isVol ? volume : played) * 100}% 100%` };
  };

  const checkIsPlaying = useMemo(
    () => (isPlaying ? isIdle : isPlaying),
    [isIdle, isPlaying]
  );

  return (
    <div
      className="absolute h-screen w-full p-10 z-40"
      style={{ backgroundColor: !checkIsPlaying ? 'rgba(0, 0, 0, 0.35)' : '' }}
      onClick={onClick}
    >
      <AnimatePresence>
        {!checkIsPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full flex flex-col justify-between"
          >
            <div className="h-12 text-white flex items-center justify-between">
              <Breadcrumb
                className=" px-2 "
                onClick={(e) => e.stopPropagation()}
              >
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/search/${slug}`}
                      className="line-clamp-1"
                    >
                      {uppercaseLetter(kebabToNormal(slug || ''))}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="line-clamp-1">
                    <BreadcrumbPage>Episode {currentEps}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <SheetTrigger
                onClick={(e) => e.stopPropagation()}
                className="border p-2 rounded-md bg-black"
              >
                Episodes
              </SheetTrigger>
            </div>
            <div className=" text-white flex flex-col items-center gap-10">
              <div className="w-full flex flex-col gap-3 ">
                <div className="w-full flex justify-between gap-6 items-center">
                  <IconButton>
                    {isPlaying ? (
                      <FaPause size={24} className="cursor-pointer" />
                    ) : (
                      <FaPlay size={24} className="cursor-pointer" />
                    )}
                  </IconButton>
                  <div
                    className="w-full h-min flex flex-col gap-4 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                    <div className="absolute flex justify-between text-sm font-medium leading-none w-full mt-4 top-full">
                      <div>{convertSec(timePlayed)}</div>
                      <div>{convertSec(duration)}</div>
                    </div>
                  </div>
                  <HoverCard openDelay={100}>
                    <HoverCardTrigger onClick={(e) => e.stopPropagation()}>
                      <IconButton>
                        <FaVolumeDown size={24} className="cursor-pointer" />
                      </IconButton>
                    </HoverCardTrigger>
                    <HoverCardContent onClick={(e) => e.stopPropagation()}>
                      <input
                        type="range"
                        value={volume}
                        min={0}
                        max={1}
                        step={0.0001}
                        onClick={(e) => e.stopPropagation()}
                        style={getBackgroundSize(true)}
                        className="slider-vol w-full"
                        onChange={handleVolumeChange}
                      />
                    </HoverCardContent>
                  </HoverCard>
                  <Popover>
                    <PopoverTrigger
                      className=""
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IoSettingsSharp size={24} />
                    </PopoverTrigger>
                    <PopoverContent onClick={(e) => e.stopPropagation()}>
                      <div className="">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Resolution
                          </h4>
                        </div>
                        <div className="pt-3">
                          <Select
                            value={vidResolution}
                            onValueChange={handleResolutionChange}
                          >
                            <SelectTrigger>
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
                        </div>
                        <div className="space-y-2 mt-4">
                          <h4 className="font-medium leading-none">Server</h4>
                        </div>
                        <div className="pt-3">
                          <Select disabled>
                            <SelectTrigger>
                              <SelectValue placeholder="GogoAnime" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">GogoAnime</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <IconButton>
                    {isFullScreen ? (
                      <MdFullscreenExit
                        size={26}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFullScreen();
                        }}
                      />
                    ) : (
                      <MdFullscreen
                        size={26}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFullScreen();
                        }}
                      />
                    )}
                  </IconButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlayerOverlay;
