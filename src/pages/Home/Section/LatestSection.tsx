import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import { AnimeRecentData } from '@/services/anime/getRecentAnime/types';

interface LatestSectionProps {
  data: AnimeRecentData;
}

const LatestSection: FC<LatestSectionProps> = ({ data }) => {
  return (
    <div className="my-4">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Latest
      </h3>
      <div className="grid gap-4 grid-cols-5 mt-4">
        {data.results.map((item, idx) => (
          <div key={idx} className="w-full h-full relative">
            <img
              src={item.image}
              alt=""
              className="w-full h-96 object-cover rounded-md"
            />
            <div></div>
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
