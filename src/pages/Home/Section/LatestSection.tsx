import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import { AnimeRecentData } from '@/services/anime/getRecentAnime/types';

interface LatestSectionProps {
  data: AnimeRecentData;
}

const LatestSection: FC<LatestSectionProps> = ({ data }) => {
  return (
    <div className="mb-4 mt-10 ">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Latest
      </h3>
      <div className="grid gap-4 grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-5">
        {data.results.map((item, idx) => (
          <div key={idx} className="w-full h-full relative">
            <img
              src={item.image}
              alt=""
              className="w-full h-60 object-cover rounded-md lg:h-96"
            />
            <div className="absolute bottom-0 bg-bluePrimary w-full text-center rounded-b-md py-1 text-lg font-semibold">
              Episode {item.episodeNumber}
            </div>
          </div>
        ))}
      </div>
      <Button variant="secondary" className="text-white mt-4 w-full">
        Explore More
      </Button>
    </div>
  );
};

export default LatestSection;
