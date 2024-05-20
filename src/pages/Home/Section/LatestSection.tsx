import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import { AnimeRecentData } from '@/services/anime/getRecentAnime/types';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

interface LatestSectionProps {
  data: AnimeRecentData;
  isLoading: boolean;
}

const LatestSection: FC<LatestSectionProps> = ({ data, isLoading }) => {
  const [api, setApi] = useState<CarouselApi>();

  const navigate = useNavigate();

  return (
    <div className="px-2 mb-4 mt-5">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Latest Updated
      </h3>
      {isLoading || data.results.length === 0 ? (
        <div className="grid gap-2  my-2 md:grid-cols-4">
          {Array.from(Array(4), (_, i) => (
            <div className="" key={i}>
              <div className="h-44 bg-primary rounded-md animate-pulse"></div>
              <div className="h-4 w-32 bg-primary mt-2 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : (
        <Carousel setApi={setApi} className="py-2">
          <CarouselContent>
            {data.results.map((item, idx) => (
              <CarouselItem
                key={idx}
                className="cursor-pointer sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                onClick={() => navigate(`/${item.id}/${item.episodeId}`)}
              >
                <div className=" h-44 rounded-md relative flex items-end border ">
                  <img
                    src={item.image}
                    alt=""
                    className="object-cover h-44 w-full rounded-md "
                  />
                </div>
                <div className="mt-2">
                  <div className="text-sm">{item.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Episode {item.episodeNumber}
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

export default LatestSection;
