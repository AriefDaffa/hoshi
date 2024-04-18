import type { FC } from 'react';

import type { AnimeTopData } from '@/services/anime/getTopAnime/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TrendingSectionProps {
  data: AnimeTopData;
}

const TrendingSection: FC<TrendingSectionProps> = ({ data }) => {
  return (
    <div className="px-2">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Trending
      </h3>
      <div className="grid gap-4 grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-5">
        {data.results.map((item, idx) => (
          <div key={idx} className="w-full h-full relative">
            <Badge className="absolute top-1 left-1 bg-red-600 text-base">
              Trending {idx + 1}
            </Badge>
            <img
              src={item.image}
              alt=""
              className="w-full h-60 object-cover rounded-md lg:h-96"
            />
            <div>
              {/* <div className="flex gap-2">
                {item.genres.map((el, id) => (
                  <Badge key={id}>{el}</Badge>
                ))}
              </div> */}
              {/* <h4 className="scroll-m-20 text-base font-semibold tracking-tight line-clamp-2">
                {item.title}
              </h4> */}
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

export default TrendingSection;
