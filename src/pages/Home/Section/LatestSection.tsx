import type { FC } from 'react';

import { AnimeRecentData } from '@/services/anime/getRecentAnime/types';

interface LatestSectionProps {
  data: AnimeRecentData;
  isLoading: boolean;
}

const LatestSection: FC<LatestSectionProps> = ({ data, isLoading }) => {
  return (
    <div className="px-2 mb-4 mt-5">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Latest Updated
      </h3>
      <div className="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? Array.from(Array(10), (_, i) => (
              <div key={i} className="h-[482px] border rounded-lg">
                <div className="h-[384px] bg-slate-800 rounded-lg animate-pulse"></div>
                <div className="p-2 w-full">
                  <div className="h-[20px] w-full bg-slate-800 rounded-md animate-pulse"></div>
                </div>
              </div>
            ))
          : data.results.map((item, idx) => (
              <div key={idx} className="border rounded-lg cursor-pointer">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-96 object-cover rounded-t-lg"
                />
                <div className="text-center bg-bluePrimary rounded-b-lg font-bold py-1">
                  Episode {item.episodeNumber}
                </div>
                <div className="p-2">
                  <p className="text-base font-semibold line-clamp-2">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default LatestSection;
