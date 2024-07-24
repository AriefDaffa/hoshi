import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import type { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';

interface LatestItemProps extends AnimeRecentResults {}

const LatestItem: FC<LatestItemProps> = ({
  id,
  episodeId,
  image,
  episodeNumber,
  title,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setOnHover] = useState(false);
  const navigate = useNavigate();

  const handleOnMouseHover = () => {
    setOnHover(true);
  };

  const handleOnMouseLeave = () => {
    setOnHover(false);
  };

  return (
    <div
      className="flex items-end gap-4 cursor-pointer pt-2 pb-6 border-b-[1px] hover:brightness-75"
      onClick={() => navigate(`/watch/${id}/${episodeId}`)}
      onMouseEnter={handleOnMouseHover}
      onMouseLeave={handleOnMouseLeave}
    >
      <img src={image} alt="" className="w-28 h-40 object-cover" />
      <div className="w-full flex flex-1">
        <div className="space-y-2 w-full">
          <div className="text-lg pr-2 line-clamp-3">{title}</div>
          <div className="text-xs">Episode {episodeNumber}</div>
          <Button className="flex gap-4 items-center float-right bg-red-700">
            Play
            <FaPlay />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LatestItem;
