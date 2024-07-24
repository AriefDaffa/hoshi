import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import { AnimeTopData } from '@/services/anime/getTopAnime/types';

interface PopularSectionProps extends AnimeTopData {}

const PopularSection: FC<PopularSectionProps> = ({ results }) => {
  const navigate = useNavigate();

  return (
    <div className="md:w-[30%]">
      <div className="text-xl font-semibold underline underline-offset-2">
        Popular Anime
      </div>
      <div className="pt-8 flex flex-col gap-4">
        {results.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-4 items-center cursor-pointer hover:brightness-75"
            onClick={() => navigate(`/detail/${item.id}`)}
          >
            <div className="w-[15%]">
              <img src={item.image} alt="" className="size-full object-cover" />
            </div>
            <div className="w-[85%]">
              <div>{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSection;
