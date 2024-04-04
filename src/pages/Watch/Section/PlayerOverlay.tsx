import { useEffect, useState } from 'react';
import { FaVolumeDown } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa6';
import { MdFullscreen } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';
import { useMouse } from '@mantine/hooks';
import type { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

import IconButton from '@/components/IconButton';
import { Badge } from '@/components/ui/badge';
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

interface PlayerOverlayProps {
  isPlaying: boolean;
  played: number;
  setPlayed: Dispatch<SetStateAction<number>>;
  onEpsListClick: () => void;
}

const PlayerOverlay: FC<PlayerOverlayProps> = ({
  played,
  isPlaying,
  setPlayed,
  onEpsListClick,
}) => {
  const { ref, x, y } = useMouse();
  const [openControl, setOpenControl] = useState(false);

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const getBackgroundSize = () => {
    return { backgroundSize: `${played * 100}% 100%` };
  };

  useEffect(() => {
    if (isPlaying) {
      setOpenControl(true);
    } else {
      setOpenControl(true);

      const timer = setTimeout(() => {
        setOpenControl(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, x, y]);

  return (
    <div
      ref={ref}
      className="absolute h-screen w-full flex flex-col justify-between font-geist p-10 "
      style={{ backgroundColor: openControl ? 'rgba(0, 0, 0, 0.35)' : '' }}
    >
      <div className="h-12 text-white flex items-center justify-between">
        <IconButton>
          <IoArrowBack size={24} />
        </IconButton>
        <Badge
          variant="default"
          className="cursor-pointer"
          onClick={onEpsListClick}
        >
          Episodes
        </Badge>
      </div>
      <div className=" text-white flex flex-col items-center gap-10">
        <div>
          <Badge>Episode 1</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-8xl">
            Jujutsu Kaisen
          </h1>
          <p className="leading-7 text-justify w-2/3 line-clamp-4 [&:not(:first-child)]:mt-6">
            Idly indulging in baseless paranormal activities with the Occult
            Club, high schooler Yuuji Itadori spends his days at either the
            clubroom or the hospital, where he visits his bedridden grandfather.
            However, this leisurely lifestyle soon takes a turn for the strange
            when he unknowingly encounters a cursed item. Triggering a chain of
            supernatural occurrences, Yuuji finds himself suddenly thrust into
            the world of Curses—dreadful beings formed from human malice and
            negativity—after swallowing the said item, revealed to be a finger
            belonging to the demon Sukuna Ryoumen, the King of Curses. Yuuji
            experiences first-hand the threat these Curses pose to society as he
            discovers his own newfound powers. Introduced to the Tokyo
            Prefectural Jujutsu High School, he begins to walk down a path from
            which he cannot return—the path of a Jujutsu sorcerer.
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 ">
          <div className="w-full flex justify-between gap-6 items-center">
            <IconButton>
              <FaPlay size={24} className="cursor-pointer" />
            </IconButton>
            <div className="w-full h-min flex flex-col gap-4 relative">
              <input
                type="range"
                min="0"
                max="0.99999"
                step="any"
                className="w-full"
                style={getBackgroundSize()}
                value={played}
                onChange={handleSeekChange}
              />
              <div className="absolute flex justify-between text-sm font-medium leading-none w-full mt-4 top-full">
                <div>2:00</div>
                <div>23:30</div>
              </div>
            </div>
            <IconButton>
              <FaVolumeDown size={24} className="cursor-pointer" />
            </IconButton>
            <Popover>
              <PopoverTrigger className="">
                <Badge variant="destructive">1080p</Badge>
              </PopoverTrigger>
              <PopoverContent>
                <div className="">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Resolution</h4>
                    <p className="text-sm text-muted-foreground">
                      Set video resolution
                    </p>
                  </div>
                  <div className="pt-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Resolution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">360p</SelectItem>
                        <SelectItem value="dark">480p</SelectItem>
                        <SelectItem value="system">720p</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <IconButton>
              <MdFullscreen size={26} className="cursor-pointer" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerOverlay;
