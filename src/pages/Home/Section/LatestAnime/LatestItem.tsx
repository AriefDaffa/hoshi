import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FC } from 'react';

import type { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';
import { FaPlay } from 'react-icons/fa';

interface LatestItemProps extends AnimeRecentResults {}

const LatestItem: FC<LatestItemProps> = ({
  id,
  episodeId,
  image,
  episodeNumber,
  title,
}) => {
  const [onHover, setOnHover] = useState(false);
  const navigate = useNavigate();

  const handleOnMouseHover = () => {
    setOnHover(true);
  };

  const handleOnMouseLeave = () => {
    setOnHover(false);
  };

  return (
    <div
      className="flex items-center gap-2 relative h-[80px] cursor-pointer hover:brightness-75 sm:w-1/3"
      onClick={() => navigate(`/watch/${id}/${episodeId}`)}
      onMouseEnter={handleOnMouseHover}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="w-16 h-16 rounded-md overflow-hidden">
        <img src={image} alt="" className="w-16 h-16 object-cover" />
      </div>
      <div className="w-full flex flex-1 justify-between items-center">
        <div>
          <div className="text-sm text-muted-foreground">
            Episode {episodeNumber}
          </div>
          <div className="line-clamp-1 pr-2">{title}</div>
        </div>
      </div>
      {onHover && (
        <div className="pr-4">
          <FaPlay />
        </div>
      )}
    </div>
  );
};

export default LatestItem;
