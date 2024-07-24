import { useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import type { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';

interface BrowseItemProps extends AnimeRecentResults {}

const BrowseItem: FC<BrowseItemProps> = ({ id, image, title }) => {
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
      className="relative cursor-pointer overflow-hidden"
    >
      <div
        className="h-96 rounded-md relative"
        onMouseEnter={handleOnMouseHover}
        onMouseLeave={handleOnMouseLeave}
      >
        <img
          src={image}
          alt=""
          className="h-96 w-full object-cover rounded-md "
        />
        {onHover && (
          <div className="absolute w-full bottom-0 rounded-md p-2 flex items-end">
            <div className="w-full bg-[#121212] backdrop-blur-md rounded-md p-2">
              <div className="text-base line-clamp-2 text-center">{title}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseItem;
