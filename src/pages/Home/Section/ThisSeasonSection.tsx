import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import type { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';

interface ThisSeasonSectionProps {
  isLoading: boolean;
  data: AnimeRecentResults[];
}

const ThisSeasonSection: FC<ThisSeasonSectionProps> = ({ data, isLoading }) => {
  const navigate = useNavigate();

  return (
    <div className="px-2 mb-4 mt-5">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Explore Anime
      </h3>
      {isLoading || data?.length === 0 ? (
        <div className="w-full border rounded-md h-96 mt-2 animate-pulse bg-primary"></div>
      ) : (
        <div className="grid gap-4  py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.slice(10).map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/detail/${item.id}`)}
              className="relative"
            >
              <div className="h-96 rounded-md relative flex items-end border cursor-pointer">
                <img
                  src={item.image}
                  alt=""
                  className="object-cover h-96 w-full rounded-md"
                />
              </div>
              <div className="hidden absolute text-sm size-full top-0 p-2 backdrop-blur-md bg-white/30 rounded-md items-center justify-center">
                <div className="text-lg text-center text-black font-semibold">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThisSeasonSection;
