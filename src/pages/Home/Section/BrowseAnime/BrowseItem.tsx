import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import type { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';

interface BrowseItemProps extends AnimeRecentResults {}

const BrowseItem: FC<BrowseItemProps> = ({
  id,
  image,
  title,
  episodeNumber,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/detail/${id}`)}
      className="relative cursor-pointer"
    >
      <div className="h-52 rounded-md hover:brightness-50">
        <img
          src={image}
          alt=""
          className="h-52 w-full object-cover rounded-md"
        />
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
