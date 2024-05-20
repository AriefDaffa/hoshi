import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
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

  return (
    <div className="px-2 mb-4 mt-5">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Latest Updated
      </h3>
      <Carousel setApi={setApi} className="py-2">
        <CarouselContent>
          {data.results.map((item, idx) => (
            <CarouselItem
              key={idx}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className=" h-44 rounded-md relative flex items-end border">
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
      {/* <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
              <div
                key={idx}
                className="border rounded-lg cursor-pointer relative hover:brightness-75"
                onClick={() =>
                  (window.location.href = `/watch/${item.id}/${item.episodeId}`)
                }
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-52 object-cover rounded-t-lg sm:h-96"
                />
                <div className="text-center bg-red-600 rounded-l-lg font-bold py-1 absolute top-4 right-0 px-2">
                  Episode {item.episodeNumber}
                </div>
                <div className="text-center bg-primary-blue text-black rounded-b-lg font-semibold py-1 line-clamp-1">
                  {item.title}
                </div>
              </div>
            ))}
      </div> */}
    </div>
  );
};

export default LatestSection;
