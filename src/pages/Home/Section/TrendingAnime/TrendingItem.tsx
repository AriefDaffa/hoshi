import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import type { AnimeTopResults } from '@/services/anime/getTopAnime/types';

interface TrendingItemProps extends AnimeTopResults {}

const TrendingItem: FC<TrendingItemProps> = ({ id, image, title }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer min-w-64"
      onClick={() => navigate(`/detail/${id}`)}
    >
      <div className="relative flex items-end w-full border rounded-md h-96 hover:brightness-50">
        <img
          src={image}
          alt=""
          className="object-cover w-full rounded-md h-96"
        />
      </div>
      <div className="mt-2">
        <div className="text-sm line-clamp-1">{title}</div>
      </div>
    </div>
  );
};

export default TrendingItem;
