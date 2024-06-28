import { useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import type { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';
import { FaPlay } from 'react-icons/fa';

interface BrowseItemProps extends AnimeRecentResults {}

const BrowseItem: FC<BrowseItemProps> = ({
  id,
  image,
  title,
  episodeNumber,
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
      onClick={() => navigate(`/detail/${id}`)}
      className="relative cursor-pointer"
    >
      <div className="h-96 rounded-md relative ">
        <img
          src={image}
          alt=""
          className="h-96 w-full object-cover rounded-md hover:brightness-50"
          onMouseEnter={handleOnMouseHover}
          onMouseLeave={handleOnMouseLeave}
        />
        {onHover && (
          <div className="absolute bottom-1 right-1 rounded-md py-2 px-4 backdrop-blur-2xl flex gap-2 items-center">
            <div className="font-semibold">Play</div>
            <FaPlay />
          </div>
        )}
      </div>
      <div className="pt-2">
        <div className="text-sm">Latest Episode: {episodeNumber}</div>
        <div className="text-sm text-muted-foreground line-clamp-2">
          {title}
        </div>
      </div>
    </div>
  );
};

export default BrowseItem;
