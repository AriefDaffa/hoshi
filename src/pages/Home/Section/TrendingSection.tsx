import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import type { FC } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { AnimeTopData } from '@/services/anime/getTopAnime/types';
import type { CarouselApi } from '@/components/ui/carousel';

interface TrendingSectionProps {
  isLoading: boolean;
  data: AnimeTopData;
}

const TrendingSection: FC<TrendingSectionProps> = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className="size-full px-2">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4">
        Trending Anime
      </h3>
      {isLoading || data.results.length === 0 ? (
        <div className="w-full border rounded-md h-96 mt-2 animate-pulse bg-primary"></div>
      ) : (
        <Carousel setApi={setApi} className="py-2">
          <CarouselContent>
            {data.results.map((item, idx) => (
              <CarouselItem key={idx} className="">
                <div
                  className="h-96 rounded-md relative flex flex-col-reverse border card-home cursor-pointer md:flex-row "
                  onClick={() => navigate(`/${item.id}`)}
                >
                  <div className="p-2 flex flex-col justify-end md:w-1/2 md:px-4 md:py-8">
                    <div className="flex gap-2">
                      <Badge variant="destructive">Trending #{idx + 1}</Badge>
                      <Badge>Current Episode: {item.episodeNumber}</Badge>
                    </div>
                    <div className="font-semibold text-lg my-1 line-clamp-2 md:text-2xl lg:text-5xl">
                      {item.title}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {item.genres.join(', ')}
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden -z-10 md:w-1/2">
                    <img
                      src={item.image}
                      alt=""
                      className="object-cover w-full rounded-md"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="w-full flex justify-end mt-2 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
            >
              <IoIosArrowBack />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
            >
              <IoIosArrowForward />
            </Button>
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default TrendingSection;
