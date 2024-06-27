import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import type { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';

interface BrowseItemProps extends AnimeRecentResults {}

const BrowseItem: FC<BrowseItemProps> = ({ id, image }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/detail/${id}`)} className="relative">
      <div className="h-96 rounded-md relative flex items-end border cursor-pointer hover:brightness-50">
        <img
          src={image}
          alt=""
          className="object-cover h-96 w-full rounded-md"
        />
      </div>
    </div>
  );
};

export default BrowseItem;
