import { useEffect, useState } from 'react';
import { FaPlay, FaVolumeDown } from 'react-icons/fa';
import { BsFullscreen } from 'react-icons/bs';

import { useMouse } from '@mantine/hooks';
import type { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

interface PlayerOverlayProps {
  isPlaying: boolean;
  played: number;
  setPlayed: Dispatch<SetStateAction<number>>;
}

const PlayerOverlay: FC<PlayerOverlayProps> = ({
  isPlaying,
  played,
  setPlayed,
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
      className="absolute h-screen w-screen flex flex-col justify-between font-geist"
      style={{ backgroundColor: openControl ? 'rgba(0, 0, 0, 0.35)' : '' }}
    >
      <div className=" h-12 text-white"></div>
      <div className=" h-12 text-white flex items-center px-4 pb-6">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex justify-between gap-2 text-sm font-medium leading-none items-center">
            <div>2:00</div>
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
            <div>15:20</div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-6">
              <FaPlay size={18} />
              <FaVolumeDown size={24} />
            </div>
            <div className="flex items-center gap-6">
              <BsFullscreen />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerOverlay;
