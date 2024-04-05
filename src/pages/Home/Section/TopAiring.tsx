import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useState, type FC, useCallback, useEffect } from 'react';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import IconButton from '@/components/IconButton';

interface TopAiringProps {}

const TopAiring: FC<TopAiringProps> = ({ data }) => {
  const [embla, setEmbla] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    embla?.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    embla?.scrollNext();
  }, [embla]);

  const onSelect = useCallback((embla: CarouselApi) => {
    if (!embla) {
      return;
    }

    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, []);

  useEffect(() => {
    if (!embla || !setEmbla) {
      return;
    }

    setEmbla(embla);
  }, [embla]);

  useEffect(() => {
    if (!embla) {
      return;
    }

    onSelect(embla);
    embla.on('reInit', onSelect);
    embla.on('select', onSelect);

    return () => {
      embla?.off('select', onSelect);
    };
  }, [embla, onSelect]);

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight py-4">
        Trending Anime
      </h3>
      <div className="p-4 border rounded-md">
        <Carousel setApi={setEmbla} className="pt-4 relative">
          <CarouselContent>
            {data?.results?.map((item, idx) => (
              <CarouselItem key={idx} className="h-[28rem] ">
                <div className="w-full h-full flex gap-10">
                  <img src={item?.image} alt="" className="h-full rounded-lg" />
                  <div className="h-full flex flex-col">
                    {/* <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Trending #{idx + 1}
                  </p> */}
                    <Badge variant="destructive" className="w-max">
                      Trending #{idx + 1}
                    </Badge>
                    <h1 className="scroll-m-20 w-2/3 text-4xl font-extrabold tracking-tight lg:text-5xl">
                      {item?.title}
                    </h1>
                    <div className="flex gap-2 mt-2">
                      {item?.genres?.map((el, indx) => (
                        <Badge key={indx}>{el}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button className="mt-4 max-w-[200px]" variant="outline">
                        Watch
                      </Button>
                      <Button className="mt-4 max-w-[200px]" variant="default">
                        Add to list
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Episodes:{' '}
                      <span className="font-bold text-white">
                        {item?.episodeNumber}
                      </span>
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-0 right-0 flex gap-2">
            <IconButton onClick={scrollPrev}>
              <FaArrowLeft />
            </IconButton>
            <IconButton onClick={scrollNext}>
              <FaArrowRight />
            </IconButton>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default TopAiring;
