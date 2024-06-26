import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import type { AnimeTopResults } from '@/services/anime/getTopAnime/types';

interface TrendingItemProps extends AnimeTopResults {}

const TrendingItem: FC<TrendingItemProps> = ({ id, image, title }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer w-80"
      onClick={() => navigate(`/detail/${id}`)}
    >
      <div className="h-44 rounded-md relative flex items-end border w-full hover:brightness-50">
        <img
          src={image}
          alt=""
          className="object-cover h-44 rounded-md w-full"
        />
      </div>
      <div className="mt-2">
        <div className="text-sm line-clamp-1">{title}</div>
      </div>
    </div>
  );
};

export default TrendingItem;
